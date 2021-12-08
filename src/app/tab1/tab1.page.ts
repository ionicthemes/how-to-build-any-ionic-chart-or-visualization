import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ECharts, EChartsOption } from 'echarts';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  multipleLineChartOption: EChartsOption = {
    tooltip : {
      trigger: 'item',
      formatter: '{c}'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      splitNumber: 4,
      axisLine: {
        show: false
      }
    },
    // legend: {
    //   type: 'plain',
    //   orient: 'horizontal',
    //   bottom: 0
    // },
    grid: {
      left: '10%',
      right: '0%'
    },
    // legend: {
    //   show: true,
    //   type: 'plain',
    //   // orient: 'horizontal',
    //   // bottom: 0
    // },
    series: [
      {
        id: 'earnings',
        name: 'Earnings',
        data: [680, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      },
      {
        id: 'revenue',
        name: 'Revenue',
        data: [620, 999, 1003, 1200, 1100, 1200, 1500],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#CCC',
          type: 'dashed'
        }
      }
    ]
  };

  chartControlsGroup: FormGroup;

  echartsInstance: ECharts;

  constructor() {
    
  }

  ngOnInit() {
    this.chartControlsGroup = new FormGroup({
      earningsData: new FormControl(true, Validators.required),
      revenueData: new FormControl(true, Validators.required),
      // TODO: poner este valor en las options de la chart
      smoothLine: new FormControl(true, Validators.required),
      dataPeriod: new FormControl('', Validators.required)
    });

    this.onChanges();
  }

  // Get Echarts instance: https://github.com/xieziyu/ngx-echarts#echarts-instance
  onChartInit(ec: ECharts) {
    this.echartsInstance = ec;
  }

  onChanges(): void {
    // TODO: Mencionar que la forma correcta de hacerlo es con this.echartsInstance.setOption()
    this.chartControlsGroup.get('smoothLine').valueChanges.subscribe(val => {
      console.log('smoothLine', val);
      this.multipleLineChartOption = {
        ...this.multipleLineChartOption,
        series: [
          {
            id: 'earnings',
            name: 'Earnings',
            data: [680, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: val
          },
          {
            id: 'revenue',
            name: 'Revenue',
            data: [620, 999, 1003, 1200, 1100, 1200, 1500],
            type: 'line',
            smooth: val,
            lineStyle: {
              color: '#CCC',
              type: 'dashed'
            }
          }
        ]
      };
    });

    // TODO: Mencionar que la forma correcta de hacerlo es con this.echartsInstance.setOption()
    this.chartControlsGroup.get('dataPeriod').valueChanges.subscribe(val => {
      console.log('dataPeriod', val);

      const smoothVal = this.chartControlsGroup.get('smoothLine').value;

      switch (val) {
        case 'october':

          this.multipleLineChartOption = {
            ...this.multipleLineChartOption,
            series: [
              {
                id: 'earnings',
                name: 'Earnings',
                data: [980, 232, 601, 434, 1090, 1230, 1720],
                type: 'line',
                smooth: smoothVal
              },
              {
                id: 'revenue',
                name: 'Revenue',
                data: [120, 699, 1203, 1700, 1200, 1100, 1900],
                type: 'line',
                smooth: smoothVal,
                lineStyle: {
                  color: '#CCC',
                  type: 'dashed'
                }
              }
            ]
          };

          break;
        case 'november':

          this.multipleLineChartOption = {
            ...this.multipleLineChartOption,
            series: [
              {
                id: 'earnings',
                name: 'Earnings',
                data: [680, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: smoothVal
              },
              {
                id: 'revenue',
                name: 'Revenue',
                data: [620, 999, 1003, 1200, 1100, 1200, 1500],
                type: 'line',
                smooth: smoothVal,
                lineStyle: {
                  color: '#CCC',
                  type: 'dashed'
                }
              }
            ]
          };

          break;
      
        default:
          break;
      }
    });


    // See: https://github.com/apache/echarts/issues/15585
    // See: https://echarts.apache.org/en/api.html#echartsInstance.setOption
    // TODO: Esto nos puede servir para la feature de live data
    // Live data, we can also use: https://echarts.apache.org/en/api.html#echartsInstance.appendData
    this.chartControlsGroup.get('earningsData').valueChanges.subscribe(toggleEarningsData => {
      console.log('toggleEarningsData', toggleEarningsData);

      // const smoothVal = this.chartControlsGroup.get('smoothLine').value;

      // ! Este solo funciona si tenemos activados los legends en las options de la chart
      // this.echartsInstance.dispatchAction({
      //   type: 'legendToggleSelect',
      //   name: 'Earnings'
      // });

      // ! Este no me funciono
      // this.echartsInstance.dispatchAction({
      //   // type: 'toggleSelected',
      //   type: 'unselect',
      //   // seriesId: 'earnings',
      //   // seriesName: 'Earnings',
      //   name: 'Earnings'
      // });


      const earningsData = (toggleEarningsData) ? [680, 932, 901, 934, 1290, 1330, 1320] : [];

      this.echartsInstance.setOption({
        series: [
          {
            id: 'earnings',
            data: earningsData
          }
        ]
      });
    });

    this.chartControlsGroup.get('revenueData').valueChanges.subscribe(toggleRevenueData => {
      console.log('toggleRevenueData', toggleRevenueData);

      // const smoothVal = this.chartControlsGroup.get('smoothLine').value;

      const revenueData = (toggleRevenueData) ? [620, 999, 1003, 1200, 1100, 1200, 1500] : [];

      this.echartsInstance.setOption({
        series: [
          {
            id: 'revenue',
            data: revenueData
          }
        ]
      });
    });
  }
}
