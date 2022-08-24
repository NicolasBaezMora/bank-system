import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.service';
import { BankModel } from '../../interfaces/BankModel';
import { MatDialog } from '@angular/material/dialog';
import { AddBankComponent } from '../../components/add-bank/add-bank.component';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {

  constructor(
    private bankService: BankService,
    private dialog: MatDialog
  ) { }

  public banks: BankModel[] = [];

  ngOnInit(): void {
    this.getBanks();
  }

  private getBanks() {
    this.bankService.getBanks().subscribe(
      banksData => this.banks = banksData
    );
  }

  public openDataBank() {
    console.log("open!!");
  }

  public addBank() {
    const addBankDialog = this.dialog.open(
      AddBankComponent,
      {
        width: "50%",
      }
    );
    addBankDialog.afterClosed().subscribe(
      () => this.getBanks()
    );
  }

}
