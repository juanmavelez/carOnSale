import { Component, OnInit, Input } from '@angular/core';
import { IAuction } from '@core/models';
@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss'],
})
export class AuctionComponent implements OnInit {
  @Input() auction: IAuction;
  constructor() {}

  ngOnInit(): void {}
}
