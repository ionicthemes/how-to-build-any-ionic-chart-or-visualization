import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineChartComponent } from '@swimlane/ngx-charts';
import { curveLinear, curveNatural } from 'd3-shape';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(LineChartComponent) chartInstance?: LineChartComponent;

  lineChartOptions = {
    showXAxis: true,
    showYAxis: true,
    showLegend: false,
    showGridLines: true,
    showXAxisLabel: false,
    showYAxisLabel: false,
    legendPosition: 'right',
    autoScale: false,
    curve: curveNatural,
    roundDomains: true
  };

  lineChartData = [
    {
      name: 'Earnings',
      series: [
        {
          value: 680,
          name: 'Mon'
        },
        {
          value: 932,
          name: 'Tue'
        },
        {
          value: 901,
          name: 'Wed'
        },
        {
          value: 934,
          name: 'Thu'
        },
        {
          value: 1290,
          name: 'Fri'
        },
        {
          value: 1330,
          name: 'Sat'
        },
        {
          value: 1320,
          name: 'Sun'
        }
      ]
    },
    {
      name: 'Revenue',
      series: [
        {
          value: 620,
          name: 'Mon'
        },
        {
          value: 999,
          name: 'Tue'
        },
        {
          value: 1003,
          name: 'Wed'
        },
        {
          value: 1200,
          name: 'Thu'
        },
        {
          value: 1100,
          name: 'Fri'
        },
        {
          value: 1200,
          name: 'Sat'
        },
        {
          value: 1500,
          name: 'Sun'
        }
      ]
    }
  ];

  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1']
  };

  chartControlsGroup: FormGroup;

  constructor() {
    this.chartControlsGroup = new FormGroup({
      earningsData: new FormControl(true, Validators.required),
      revenueData: new FormControl(true, Validators.required),
      // TODO: poner este valor en las options de la chart
      smoothLine: new FormControl(true, Validators.required),
      dataPeriod: new FormControl('', Validators.required)
    });

    this.onChanges();
  }

  onChanges(): void {
    this.chartControlsGroup.get('smoothLine').valueChanges.subscribe(isSmooth => {
      console.log('smoothLine', isSmooth);

      this.lineChartOptions = {
        ...this.lineChartOptions,
        curve: isSmooth ? curveNatural : curveLinear
      };
      
    });

    this.chartControlsGroup.get('dataPeriod').valueChanges.subscribe(val => {
      console.log('dataPeriod', val);

      switch (val) {
        case 'october':

          this.lineChartData = [
            {
              name: 'Earnings',
              series: [
                {
                  value: 980,
                  name: 'Mon'
                },
                {
                  value: 232,
                  name: 'Tue'
                },
                {
                  value: 601,
                  name: 'Wed'
                },
                {
                  value: 434,
                  name: 'Thu'
                },
                {
                  value: 1090,
                  name: 'Fri'
                },
                {
                  value: 1230,
                  name: 'Sat'
                },
                {
                  value: 1720,
                  name: 'Sun'
                }
              ]
            },
            {
              name: 'Revenue',
              series: [
                {
                  value: 120,
                  name: 'Mon'
                },
                {
                  value: 699,
                  name: 'Tue'
                },
                {
                  value: 1203,
                  name: 'Wed'
                },
                {
                  value: 1700,
                  name: 'Thu'
                },
                {
                  value: 1200,
                  name: 'Fri'
                },
                {
                  value: 1100,
                  name: 'Sat'
                },
                {
                  value: 1900,
                  name: 'Sun'
                }
              ]
            }
          ];

          break;
        case 'november':

          this.lineChartData = [
            {
              name: 'Earnings',
              series: [
                {
                  value: 680,
                  name: 'Mon'
                },
                {
                  value: 932,
                  name: 'Tue'
                },
                {
                  value: 901,
                  name: 'Wed'
                },
                {
                  value: 934,
                  name: 'Thu'
                },
                {
                  value: 1290,
                  name: 'Fri'
                },
                {
                  value: 1330,
                  name: 'Sat'
                },
                {
                  value: 1320,
                  name: 'Sun'
                }
              ]
            },
            {
              name: 'Revenue',
              series: [
                {
                  value: 620,
                  name: 'Mon'
                },
                {
                  value: 999,
                  name: 'Tue'
                },
                {
                  value: 1003,
                  name: 'Wed'
                },
                {
                  value: 1200,
                  name: 'Thu'
                },
                {
                  value: 1100,
                  name: 'Fri'
                },
                {
                  value: 1200,
                  name: 'Sat'
                },
                {
                  value: 1500,
                  name: 'Sun'
                }
              ]
            }
          ];

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

      const earningsData = (toggleEarningsData) ? [
        {
          value: 680,
          name: 'Mon'
        },
        {
          value: 932,
          name: 'Tue'
        },
        {
          value: 901,
          name: 'Wed'
        },
        {
          value: 934,
          name: 'Thu'
        },
        {
          value: 1290,
          name: 'Fri'
        },
        {
          value: 1330,
          name: 'Sat'
        },
        {
          value: 1320,
          name: 'Sun'
        }
      ] : [];

      // TODO: emprolijar esto
      this.lineChartData[0].series = earningsData;
    });

    this.chartControlsGroup.get('revenueData').valueChanges.subscribe(toggleRevenueData => {
      console.log('toggleRevenueData', toggleRevenueData);

      const revenueData = (toggleRevenueData) ? [
        {
          value: 620,
          name: 'Mon'
        },
        {
          value: 999,
          name: 'Tue'
        },
        {
          value: 1003,
          name: 'Wed'
        },
        {
          value: 1200,
          name: 'Thu'
        },
        {
          value: 1100,
          name: 'Fri'
        },
        {
          value: 1200,
          name: 'Sat'
        },
        {
          value: 1500,
          name: 'Sun'
        }
      ] : [];

      // TODO: emprolijar esto
      // ! No esta funcionando por como se asigna el objeto. Ver si con un operador de objeto funciona mejor o no
      // ! Capaz una sallow copy con destructing funciona (see: https://stackoverflow.com/a/12690181/1116959)
      let newData = new Array();
      newData = this.lineChartData;
      newData[1] = {...newData[1], series: revenueData};

      // debugger;

      // this.lineChartData = [
      //   {
      //     name: 'Earnings',
      //     series: [
      //       {
      //         value: 680,
      //         name: 'Mon'
      //       },
      //       {
      //         value: 932,
      //         name: 'Tue'
      //       },
      //       {
      //         value: 901,
      //         name: 'Wed'
      //       },
      //       {
      //         value: 934,
      //         name: 'Thu'
      //       },
      //       {
      //         value: 1290,
      //         name: 'Fri'
      //       },
      //       {
      //         value: 1330,
      //         name: 'Sat'
      //       },
      //       {
      //         value: 1320,
      //         name: 'Sun'
      //       }
      //     ]
      //   },
      //   {
      //     name: 'Revenue',
      //     series: [
            
      //     ]
      //   }
      // ];

      this.lineChartData = [...newData];
      // this.lineChartData.pop();
      // this.lineChartData.push(newData[1]);
      // this.lineChartData = [];
    });
  }

}
