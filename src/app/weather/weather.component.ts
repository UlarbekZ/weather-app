import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { WeatherService } from './weather.service';
import {
  WeatherConditions,
  WeatherConditionsTitle,
  WeatherData,
  WeatherDataResponse,
  WeatherDetails,
  WeatherInfo,
} from './weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  data!: WeatherDataResponse;
  listOfCharts: string[] = Object.keys(WeatherConditionsTitle);
  weatherData!: WeatherInfo[];
  weatherDetails!: WeatherDetails[];

  constructor(private service: WeatherService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.service.getData().subscribe((data: WeatherDataResponse) => {
      this.weatherData = data.list.map(
        (data: WeatherData) => data.weather.map((weahter) => weahter)[0]
      );
      this.weatherDetails = data.list.map((data: WeatherData) => {
        return { ...data.wind, ...data.clouds };
      });
      this.data = data;
    });
  }

  public getData(chart: string): ChartConfiguration<'line'>['data'] {
    const chartData = this.data.list.map(
      (data: WeatherData) => data.main[chart as keyof WeatherConditions]
    );

    const labels = this.data.list.map((main) =>
      this.datePipe.transform(main.dt_txt, 'short')!.toString()
    );

    return {
      labels: labels,
      datasets: [
        {
          label: WeatherConditionsTitle[chart as keyof WeatherConditions],
          data: chartData,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0,
        },
      ],
    };
  }

  public lineChartOptions: ChartOptions<'line'> = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16,
          },
        },
      },
    },
  };

  public getUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
