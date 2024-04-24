import { inject, Injectable, signal, Signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { CurrentConditions } from './current-conditions/current-conditions.type';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';
import { ConditionsAndZipStore } from './conditions-and-zip.store';
import { take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL =
    'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';

  #conditionsAndZipStore = inject(ConditionsAndZipStore);
  #http = inject(HttpClient);
  currentConditions = signal(this.storedConditions());

  storedConditions() {
    return Object.keys(this.#conditionsAndZipStore.conditions).map((key) => ({
      zip: key,
      data: this.#conditionsAndZipStore.conditions[key],
    }));
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getConditionsForLocation(zipcode: string) {
    if (this.#conditionsAndZipStore.zipConditionCached(zipcode)) {
      return of(this.#conditionsAndZipStore.conditions[zipcode]);
    }
    return this.#http.get<CurrentConditions>(
      `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`,
    );
  }

  getForecast(zipcode: string): Observable<Forecast> {
    if (this.#conditionsAndZipStore.zipForecastCached(zipcode)) {
      return of(this.#conditionsAndZipStore.forecasts[zipcode]);
    }
    return this.#http
      .get<Forecast>(
        `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`,
      )
      .pipe(tap(forecast => this.#conditionsAndZipStore.addForecast({zip: zipcode, data: forecast})));
  }

  removeLocation(zipcode: string) {
    this.#conditionsAndZipStore.removeLocation(zipcode);
    this.currentConditions.set(this.storedConditions());
  }

  getWeatherIcon(id): string {
    if (id >= 200 && id <= 232) return WeatherService.ICON_URL + 'art_storm.png';
    else if (id >= 501 && id <= 511) return WeatherService.ICON_URL + 'art_rain.png';
    else if (id === 500 || (id >= 520 && id <= 531)) return WeatherService.ICON_URL + 'art_light_rain.png';
    else if (id >= 600 && id <= 622) return WeatherService.ICON_URL + 'art_snow.png';
    else if (id >= 801 && id <= 804) return WeatherService.ICON_URL + 'art_clouds.png';
    else if (id === 741 || id === 761) return WeatherService.ICON_URL + 'art_fog.png';
    else return WeatherService.ICON_URL + 'art_clear.png';
  }

  addCurrentConditions(zipcode: string) {
    this.getConditionsForLocation(zipcode)
      .pipe(take(1))
      .subscribe((data) => {
        this.#conditionsAndZipStore.addCondition({ zip: zipcode, data });
        this.currentConditions.set(this.storedConditions());
      });
  }
}
