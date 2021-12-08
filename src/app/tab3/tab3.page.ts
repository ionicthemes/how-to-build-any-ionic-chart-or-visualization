import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LineChartComponent } from '@swimlane/ngx-charts';
import { curveLinear, curveNatural } from 'd3-shape';
import { ChartsDataService } from '../charts-data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(LineChartComponent) chartInstance?: LineChartComponent;

  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1']
  };

  lineChartOptions = {};

  lineChartData = [];

  chartControlsGroup: FormGroup;

  constructor(public chartsDataService: ChartsDataService) {
    this.chartControlsGroup = new FormGroup({
      earningsData: new FormControl(true, Validators.required),
      revenueData: new FormControl(true, Validators.required),
      smoothLine: new FormControl(true, Validators.required),
      dataPeriod: new FormControl('thisWeek', Validators.required)
    });

    const isSmooth = this.chartControlsGroup.get('smoothLine').value;

    this.lineChartOptions = {
      showXAxis: true,
      showYAxis: true,
      showLegend: false,
      showGridLines: true,
      showXAxisLabel: false,
      showYAxisLabel: false,
      legendPosition: 'right',
      autoScale: false,
      curve: isSmooth ? curveNatural : curveLinear,
      roundDomains: true
    };

    // ? Check what series we should show in the chart
    const showEarnings = this.chartControlsGroup.get('earningsData').value;
    const showRevenue = this.chartControlsGroup.get('revenueData').value;
    // ? Check what period of data we should show in the chart
    const dataPeriod = this.chartControlsGroup.get('dataPeriod').value;

    const dataCategory = (showEarnings & showRevenue) ? 'all' : (showEarnings ? 'earnings' : (showRevenue ? 'revenue' : null));

    if (dataCategory !== null && dataPeriod) {
      this.lineChartData = this.chartsDataService.getData(dataPeriod, dataCategory, 'ngx-charts');
    }

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

    this.chartControlsGroup.get('dataPeriod').valueChanges.subscribe(dataPeriod => {
      console.log('dataPeriod', dataPeriod);

      // ? Check what series we should show in the chart
      const showEarnings = this.chartControlsGroup.get('earningsData').value;
      const showRevenue = this.chartControlsGroup.get('revenueData').value;

      const dataCategory = (showEarnings & showRevenue) ? 'all' : (showEarnings ? 'earnings' : (showRevenue ? 'revenue' : null));

      if (dataCategory !== null) {
        switch (dataCategory) {
          case 'all':
            this.lineChartData = this.chartsDataService.getData(dataPeriod, dataCategory, 'ngx-charts');

            break;
          case 'earnings':
            this.lineChartData = [
              this.chartsDataService.getData(dataPeriod, dataCategory, 'ngx-charts'),
              {
                name: 'Revenue',
                series: []
              }
            ];

            break;
          case 'revenue':
            this.lineChartData = [
              {
                name: 'Earnings',
                series: []
              },
              this.chartsDataService.getData(dataPeriod, dataCategory, 'ngx-charts')
            ];

            break;
        }
      }
    });


    this.chartControlsGroup.get('earningsData').valueChanges.subscribe(toggleEarningsData => {
      console.log('toggleEarningsData', toggleEarningsData);

      // ? Check what period of data we should show in the chart
      const dataPeriod = this.chartControlsGroup.get('dataPeriod').value;

      const earningsData = (toggleEarningsData) ? this.chartsDataService.getData(dataPeriod, 'earnings', 'ngx-charts').series : [];

      this.lineChartData[0] = {...this.lineChartData[0], series: earningsData};

      // ! Use a shallow copy with destructing to force update (see: https://stackoverflow.com/a/12690181/1116959)
      this.lineChartData = [...this.lineChartData];
    });

    this.chartControlsGroup.get('revenueData').valueChanges.subscribe(toggleRevenueData => {
      console.log('toggleRevenueData', toggleRevenueData);

      // ? Check what period of data we should show in the chart
      const dataPeriod = this.chartControlsGroup.get('dataPeriod').value;

      const revenueData = (toggleRevenueData) ? this.chartsDataService.getData(dataPeriod, 'revenue', 'ngx-charts').series : [];

      this.lineChartData[1] = {...this.lineChartData[1], series: revenueData};

      // ! Use a shallow copy with destructing to force update (see: https://stackoverflow.com/a/12690181/1116959)
      this.lineChartData = [...this.lineChartData];
    });
  }

}
