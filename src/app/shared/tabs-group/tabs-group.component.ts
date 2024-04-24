import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList } from '@angular/core';
import { NgForOf } from '@angular/common';
import { TabComponent } from '../tab/tab.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tabs-group',
  standalone: true,
  imports: [NgForOf],
  template: `
    <ul class="nav nav-tabs">
      <li
        *ngFor="let tab of tabs; let i = index; trackBy: trackByFn"
        (click)="selectTab(tab)"
        [class.active]="tab.active"
      >
        <a href="#">{{ tab.tabTitle }} <span class="tab-close" (click)="removeTab(i)">&times;</span></a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  styles: [
    `
      .tab-close {
        color: rgb(128, 128, 128);
        text-align: right;
        cursor: pointer;
      }
    `,
  ],
})
export class TabsGroupComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  selectedTab: TabComponent;
  #tabsChangesSubscription: Subscription;
  trackByFn = (_: number, tab: TabComponent) => tab.tabTitle;

  ngAfterContentInit() {
    this.selectTab(this.tabs.first);
    this.#tabsChangesSubscription = this.tabs.changes.subscribe(() => {
      if (!this.tabs.some((tab) => tab === this.selectedTab)) {
        this.selectTab(this.tabs.first);
      }
    });
  }

  ngOnDestroy() {
    this.#tabsChangesSubscription.unsubscribe();
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach((t) => (t.active = false));
    this.selectedTab = tab;
    this.selectedTab.active = true;
  }

  removeTab(index: number) {
    this.tabs.toArray()[index].tabClosed.emit();
    const tabsArray = this.tabs.toArray();
    tabsArray.splice(index, 1);
    this.tabs.reset(tabsArray);
    if (this.selectedTab === this.tabs.toArray()[index]) {
      this.selectTab(this.tabs.first);
    }
  }
}
