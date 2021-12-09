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

    switch (chart) {
      case 'ngx-echarts':
        if (mergedData !== null) {
          return [this.formatNgxEchartsData(mergedData['earnings'], 'earnings'), this.formatNgxEchartsData(mergedData['revenue'], 'revenue')];
        } else {
          return this.formatNgxEchartsData(filteredData, category);
        }

        break;
      case 'ng2-charts':
        if (mergedData !== null) {
          return [this.formatNg2ChartsData(mergedData['earnings'], 'earnings'), this.formatNg2ChartsData(mergedData['revenue'], 'revenue')];
        } else {
          return this.formatNg2ChartsData(filteredData, category);
        }

        break;
      case 'ngx-charts':
        if (mergedData !== null) {
          return [this.formatNgxChartsData(mergedData['earnings'], 'earnings'), this.formatNgxChartsData(mergedData['revenue'], 'revenue')];
        } else {
          return this.formatNgxChartsData(filteredData, category);
        }

        break;
      default:
        return null;

        break;
    }
  }

  public formatNgxEchartsData(data: Array<number>, category: string): any {
    let formattedData = {
      id: category,
      data: data
    };

    return formattedData;
  }

  public formatNg2ChartsData(data: Array<number>, category: string): any {
    let formattedData = {
      label: (category === 'earnings') ? 'Earnings' : 'Revenue',
      data: data
    };

    return formattedData;
  }

  public formatNgxChartsData(data: Array<number>, category: string): any {
    let formattedData = null;

    if (data !== null) {
      const labeledData = data.map((value, index) => {
        return {
          value: value,
          name: CHART_LABELS[index]
        }
      });
      
      formattedData = {
        name: (category === 'earnings') ? 'Earnings' : 'Revenue',
        series: labeledData
      };
    }

    return formattedData;
  }
}
