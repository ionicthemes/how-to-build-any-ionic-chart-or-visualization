import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(BaseChartDirective) chartInstance?: BaseChartDirective;

  // * Line Chart
  public lineChartData: ChartData<'line'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [680, 932, 901, 934, 1290, 1330, 1320],
        borderColor: '#035388',
        backgroundColor: 'rgba(3,83,136,0.4)',
        label: 'Earnings'
      },
      {
        data: [620, 999, 1003, 1200, 1100, 1200, 1500],
        // borderColor: '#035388',
        // backgroundColor: 'rgba(3,83,136,0.4)',
        label: 'Revenue'
        // yAxisID: 'yAxis'
      }
      
    ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    layout: {
      padding: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    },
    elements: {
      line: {
        // chart.options.elements.line.tension = smooth ? 0.4 : 0;
        tension: 0.4
      }
    },
    scales: {
      x: {
        axis: 'x',
        grid: {
          drawBorder: false,
          display: false
        },
        ticks: {
          display: true
        }
      },
      y: {
        axis: 'y',
        min: 0,
        grid: {
          drawBorder: false,
          display: true,
          drawTicks: false
        },
        ticks: {
          padding: 10
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
  public lineChartType: ChartType = 'line';

  chartControlsGroup: FormGroup;

  constructor(
    private themeService: ThemeService
  ) {
    this.chartControlsGroup = new FormGroup({
      earningsData: new FormControl(true, Validators.required),
      revenueData: new FormControl(true, Validators.required),
      // TODO: poner este valor en las options de la chart
      smoothLine: new FormControl(true, Validators.required),
      dataPeriod: new FormControl('', Validators.required)
    });

    this.setTheme();

    this.onChanges();
  }

  public setTheme() {
    // ? Available Chart.js configuration options here: https://www.chartjs.org/docs/latest/configuration/
    const overrides: ChartConfiguration['options'] = {
      // scales: {
      //   x: {
      //     ticks: {
      //       color: '#999999'
      //     },
      //     grid: {
      //       color: 'rgba(255,255,255,0.1)'
      //     }
      //   },
      //   y: {
      //     ticks: {
      //       color: '#999999'
      //     },
      //     grid: {
      //       color: 'rgba(255,255,255,0.1)'
      //     }
      //   }
      // },
      plugins: {
        legend: {
          labels: {
            color: '#999999',
            boxWidth: 20,
            padding: 20
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: '#FFF',
          titleColor: '#999999',
          bodyColor: '#999999',
          caretPadding: 4,
          padding: {
            top: 10,
            left: 10,
            bottom: 10,
            right: 10
          },
          borderColor: '#999999',
          borderWidth: 1
        }
      }
    };

    // ? New Chart.js default configurations (see: https://www.chartjs.org/docs/latest/getting-started/v3-migration.html#defaults)
    Chart.defaults.color = '#999999';
    // Chart.defaults.font = {
    //   family: 'Nunito, sans-serif'
    // };
    Chart.defaults.responsive = true;

    this.themeService.setColorschemesOptions(overrides);
  }


  onChanges(): void {
    // TODO: Mencionar que la forma correcta de hacerlo es con this.echartsInstance.setOption()
    this.chartControlsGroup.get('smoothLine').valueChanges.subscribe(isSmooth => {
      console.log('smoothLine', isSmooth);

      this.lineChartOptions = {
        ...this.lineChartOptions,
        elements: {
          line: {
            // chart.options.elements.line.tension = smooth ? 0.4 : 0;
            tension: isSmooth ? 0.4 : 0
          }
        },
      };
    });

    // TODO: Mencionar que la forma correcta de hacerlo es con this.echartsInstance.setOption()
    this.chartControlsGroup.get('dataPeriod').valueChanges.subscribe(val => {
      console.log('dataPeriod', val);

      // const smoothVal = this.chartControlsGroup.get('smoothLine').value;

      switch (val) {
        case 'october':

          this.lineChartData.datasets[0].data = [980, 232, 601, 434, 1090, 1230, 1720];
          this.lineChartData.datasets[1].data = [120, 699, 1203, 1700, 1200, 1100, 1900];

          this.chartInstance?.update();

          break;
        case 'november':

          this.lineChartData.datasets[0].data = [680, 932, 901, 934, 1290, 1330, 1320];
          this.lineChartData.datasets[1].data = [620, 999, 1003, 1200, 1100, 1200, 1500];

          this.chartInstance?.update();

          break;
      
        default:
          break;
      }
    });


    // See: https://github.com/apache/echarts/issues/15585
    // See: https://echarts.apache.org/en/api.html#echartsInstance.setOption
    // TODO: Esto nos puede servir para la feature de live data
    this.chartControlsGroup.get('earningsData').valueChanges.subscribe(toggleEarningsData => {
      console.log('toggleEarningsData', toggleEarningsData);

      // const isHidden = this.chartInstance?.isDatasetHidden(1);

      this.chartInstance?.hideDataset(0, !toggleEarningsData);
    });

    this.chartControlsGroup.get('revenueData').valueChanges.subscribe(toggleRevenueData => {
      console.log('toggleRevenueData', toggleRevenueData);

      this.chartInstance?.hideDataset(1, !toggleRevenueData);
    });
  }


}
