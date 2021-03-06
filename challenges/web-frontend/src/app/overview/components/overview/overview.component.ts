import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuction } from '@core/models';
import { AuctionsService } from '@core/services/auctions/auctions.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  $auction: Observable<IAuction[]>;
  constructor(private auctionsService: AuctionsService) {}

  ngOnInit(): void {
    this.$auction = this.auctionsService.getAuctionBuyer();
  }
  highestBidder(array: IAuction[]): IAuction[] {
    return array.filter((res) => res.amIHighestBidder);
  }
  hotDeals(array: IAuction[]): IAuction[] {
    return array.filter((res) => res.hotBid && !res.amIHighestBidder);
  }
  normalDeals(array: IAuction[]): IAuction[] {
    return array.filter((res) => !res.hotBid && !res.amIHighestBidder);
  }
}
