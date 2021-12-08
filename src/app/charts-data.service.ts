import { Injectable } from '@angular/core';
import { CHART_DATA, CHART_LABELS } from './charts-data';

@Injectable({
  providedIn: 'root'
})
export class ChartsDataService {

  constructor() { }

  public getData(period: string, category: string, chart: string): any {
    let filteredData = null;
    let mergedData = null;

    switch (category) {
      case 'all':
        mergedData = {
          earnings: CHART_DATA[period]['earnings'].data,
          revenue: CHART_DATA[period]['revenue'].data
        };

        break;
      default:
        filteredData = CHART_DATA[period][category].data;

        break;
    }

    switch (category) {
      case 'ngx-echarts':
        // if (mergedData !== null) {

        // } else {

        // }
        // return this.formatNgxEchartsData(filteredData, period, category);

        break;
      case 'ng2-charts':
        // return this.formatNg2ChartsData(filteredData, period, category);

        break;
      case 'ngx-charts':
        if (mergedData !== null) {
          return [
            ...this.formatNgxChartsData(filteredData, 'earnings'),
            ...this.formatNgxChartsData(filteredData, 'revenue')
          ];
        } else {
          return this.formatNgxChartsData(filteredData, category);
        }

        break;
      default:
        return null;

        break;
    }
  }

  public formatNgxEchartsData(data: any, period: string, category: string): Array<any> {
    // series: [
    //   {
    //     id: 'revenue',
    //     data: [620, 999, 1003, 1200, 1100, 1200, 1500] : [];
    //   }
    // ]

    const 
    return [];
  }

  public formatNg2ChartsData(data: any): Array<any> {
    // [980, 232, 601, 434, 1090, 1230, 1720];
    return [];
  }

  public formatNgxChartsData(data: Array<number>, category: string): any {
    const labeledData = data.map((value, index) => {
      return {
        value: value,
        name: CHART_LABELS[index]
      }
    });
    
    const formattedData = {
      name: (category === 'earnings') ? 'Earnings' : 'Revenue',
      series: labeledData
    };

    return formattedData;
  }
}
