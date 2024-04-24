import { Injectable } from '@angular/core';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';

export const CONDITIONS = 'cachedConditions';
export const FORECASTS = 'cachedForecasts';
export const CACHE_TIMEOUT_IN_SECONDS = 7200;

@Injectable()
export class ConditionsAndZipStore {
  constructor() {
    setInterval(() => localStorage.clear(), CACHE_TIMEOUT_IN_SECONDS * 1000);
  }

  addCondition(condition: ConditionsAndZip) {
    const withNewCondition = {
      ...this.conditions,
      [condition.zip]: condition.data,
    };
    localStorage.setItem(CONDITIONS, JSON.stringify(withNewCondition));
  }

  removeLocation(zipcode: string) {
    if (this.zipConditionCached(zipcode)) {
      const storedConditions = this.conditions;
      delete storedConditions[zipcode];
      localStorage.setItem(CONDITIONS, JSON.stringify(storedConditions));
    }
  }

  get conditions() {
    const currentConditions = localStorage.getItem(CONDITIONS);
    if (currentConditions) {
      return JSON.parse(currentConditions);
    }
    return {};
  }

  get forecasts() {
    const currentForecasts = localStorage.getItem(FORECASTS);
    if (currentForecasts) {
      return JSON.parse(currentForecasts);
    }
    return {};
  }

  zipConditionCached(zipcode: string) {
    const conditionsInStorage = JSON.parse(localStorage.getItem(CONDITIONS));
    return conditionsInStorage && !!conditionsInStorage[zipcode];
  }

  zipForecastCached(zipcode: string) {
    const forecastsInStorage = JSON.parse(localStorage.getItem(FORECASTS));
    return forecastsInStorage && !!forecastsInStorage[zipcode];
  }

  addForecast(forecast: { zip: string; data: Forecast }) {
    const withNewForecast = {
      ...this.forecasts,
      [forecast.zip]: forecast.data,
    };
    localStorage.setItem(FORECASTS, JSON.stringify(withNewForecast));
  }
}
