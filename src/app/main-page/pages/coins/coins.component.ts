import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { CoinModel } from '../../interfaces/CoinModel';
import { MatDialog } from '@angular/material/dialog';
import { AddCoinComponent } from '../../components/add-coin/add-coin.component';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent implements OnInit {

  constructor(
    private coinService: CoinService,
    private dialog: MatDialog
  ) { }

  public coins: CoinModel[] = [];

  ngOnInit(): void {
    this.getCoins();
  }

  private getCoins() {
    this.coinService.getCoins().subscribe(
      coinsData => this.coins = coinsData
    );
  }

  public addCoin() {
    const addCoinDialogRef = this.dialog.open(
      AddCoinComponent,
      {
        width: "50%"
      }
    );
    addCoinDialogRef.afterClosed().subscribe(
      () => this.getCoins()
    );
  }

}
