import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

// ngx-charts - lib: https://swimlane.gitbook.io/ngx-charts/
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { NgxLineChartZeroMarginDirective } from './custom-chart.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    Tab3PageRoutingModule
  ],
  declarations: [
    Tab3Page,
    NgxLineChartZeroMarginDirective
  ]
})
export class Tab3PageModule {}
