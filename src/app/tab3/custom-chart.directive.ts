import { Directive, Self } from '@angular/core';
import { LineChartComponent } from '@swimlane/ngx-charts';

@Directive({
  selector: 'ngx-charts-line-chart[hotfix-zero-margin]'
})
export class NgxLineChartZeroMarginDirective {
  constructor(@Self() lineChart: LineChartComponent) {
    lineChart.margin = [10, 10, 10, 10];
  }
}