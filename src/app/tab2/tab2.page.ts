import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, ThemeService } from 'ng2-charts';
import { CHART_LABELS } from '../charts-data';
import { ChartsDataService } from '../charts-data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(BaseChartDirective) chartInstance?: BaseChartDirective;

  // * Line Chart
  public lineChartData: ChartData<'line'> = null;

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
    private themeService: ThemeService,
    public chartsDataService: ChartsDataService
  ) {
    this.chartControlsGroup = new FormGroup({
      earningsData: new FormControl(true, Validators.required),
      revenueData: new FormControl(true, Validators.required),
      smoothLine: new FormControl(true, Validators.required),
      dataPeriod: new FormControl('thisWeek', Validators.required)
    });

    // ? Get initial value to set the curve style
    const isSmooth = this.chartControlsGroup.get('smoothLine').value;

    this.lineChartOptions = {
      ...this.lineChartOptions,
      elements: {
        line: {
          tension: isSmooth ? 0.4 : 0
        }
      },
    };

    // ? Check what series we should show in the chart
    const showEarnings = this.chartControlsGroup.get('earningsData').value;
    const showRevenue = this.chartControlsGroup.get('revenueData').value;
    // ? Check what period of data we should show in the chart
    const dataPeriod = this.chartControlsGroup.get('dataPeriod').value;

    const dataCategory = (showEarnings & showRevenue) ? 'all' : (showEarnings ? 'earnings' : (showRevenue ? 'revenue' : null));

    if (dataCategory !== null && dataPeriod) {
      const chartData = this.chartsDataService.getData(dataPeriod, dataCategory, 'ng2-charts');

      this.lineChartData = {
        labels: CHART_LABELS,
        datasets: [
          {
            label: chartData[0].label,
            data: chartData[0].data,
            borderColor: '#035388',
            backgroundColor: 'rgba(3,83,136,0.4)'
            
          },
          {
            label: chartData[1].label,
            data: chartData[1].data,
            // borderColor: '#035388',
            // backgroundColor: 'rgba(3,83,136,0.4)'
          }
          
        ]
      };
    }

    // Set chart theme
    this.setTheme();

    // Start listening for changes in the form
    this.onChanges();
  }

  public setTheme() {
    // ? Available Chart.js configuration options here: https://www.chartjs.org/docs/latest/configuration/
    const overrides: ChartConfiguration['options'] = {
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
    Chart.defaults.responsive = true;

    this.themeService.setColorschemesOptions(overrides);
  }

  public onChanges(): void {
    this.chartControlsGroup.get('smoothLine').valueChanges.subscribe(isSmooth => {
      console.log('smoothLine', isSmooth);

      this.lineChartOptions = {
        ...this.lineChartOptions,
        elements: {
          line: {
            tension: isSmooth ? 0.4 : 0
          }
        },
      };
    });

    this.chartControlsGroup.get('dataPeriod').valueChanges.subscribe(dataPeriod => {
      console.log('dataPeriod', dataPeriod);

      // ? Check what series we should show in the chart
      const showEarnings = this.chartControlsGroup.get('earningsData').value;
      const showRevenue = this.chartControlsGroup.get('revenueData').value;

      const dataCategory = (showEarnings & showRevenue) ? 'all' : (showEarnings ? 'earnings' : (showRevenue ? 'revenue' : null));

      if (dataCategory !== null) {
        const chartData = this.chartsDataService.getData(dataPeriod, dataCategory, 'ng2-charts');

        switch (dataCategory) {
          case 'all':
            this.lineChartData.datasets[0].data = chartData[0].data;
            this.lineChartData.datasets[1].data = chartData[1].data;

            break;
          case 'earnings':
            this.lineChartData.datasets[0].data = chartData.data;

            break;
          case 'revenue':
            this.lineChartData.datasets[1].data = chartData.data;

            break;
        }

        this.chartInstance?.update();
      }
    });

    this.chartControlsGroup.get('earningsData').valueChanges.subscribe(toggleEarningsData => {
      console.log('toggleEarningsData', toggleEarningsData);

      // ? Check what period of data we should show in the chart
      const dataPeriod = this.chartControlsGroup.get('dataPeriod').value;

      // Update data (in case the period changed)
      if (toggleEarningsData) {
        const earningsData = this.chartsDataService.getData(dataPeriod, 'earnings', 'ng2-charts');

        this.lineChartData.datasets[0].data = earningsData.data;

        this.chartInstance?.update();
      }

      this.chartInstance?.hideDataset(0, !toggleEarningsData);
    });

    this.chartControlsGroup.get('revenueData').valueChanges.subscribe(toggleRevenueData => {
      console.log('toggleRevenueData', toggleRevenueData);

      // ? Check what period of data we should show in the chart
      const dataPeriod = this.chartControlsGroup.get('dataPeriod').value;

      // Update data (in case the period changed)
      if (toggleRevenueData) {
        const revenueData = this.chartsDataService.getData(dataPeriod, 'revenue', 'ng2-charts');

        this.lineChartData.datasets[1].data = revenueData.data;

        this.chartInstance?.update();
      }

      this.chartInstance?.hideDataset(1, !toggleRevenueData);
    });
  }
}
