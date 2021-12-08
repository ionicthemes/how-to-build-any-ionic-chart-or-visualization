import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

// chart.js - lib: https://github.com/valor-software/ng2-charts
import { NgChartsModule } from 'ng2-charts';

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab2PageRoutingModule,
    NgChartsModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
