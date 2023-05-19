import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherDataResponse } from './weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherUrl =
    'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=0deb0db98e260bd0986c265371252124';

  constructor(private http: HttpClient) {}

  getData(): Observable<WeatherDataResponse> {
    return this.http.get<WeatherDataResponse>(this.weatherUrl);
  }
}
