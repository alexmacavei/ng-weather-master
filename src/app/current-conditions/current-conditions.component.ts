import {Component, effect, inject, Signal} from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { ConditionsAndZip } from '../conditions-and-zip.type';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent {
  protected weatherService = inject(WeatherService);
  private router = inject(Router);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  constructor() {
    effect(() => console.log(`conditions are now: ${JSON.stringify(this.currentConditionsByZip().map(cbz => cbz.zip))}`));
  }

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode]);
  }

  tabName(location: ConditionsAndZip) {
    return `${location.data.name} (${location.zip})`;
  }
}
