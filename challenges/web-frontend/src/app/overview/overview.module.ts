import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from './components/overview/overview.component';
import { AuctionComponent } from './components/auction/auction.component';

import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [OverviewComponent, AuctionComponent],
  imports: [CommonModule, OverviewRoutingModule, MaterialModule],
})
export class OverviewModule {}
