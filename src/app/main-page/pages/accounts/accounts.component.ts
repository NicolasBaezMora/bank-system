import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountModel } from '../../interfaces/AccountModel';
import { AccountService } from '../../services/account.service';
import { UpdateAccountDialogComponent } from '../../components/update-account-dialog/update-account-dialog.component';
import { AddAccountComponent } from '../../components/add-account/add-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {


  public accounts: AccountModel[] = [];

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAccountsData();
  }

  public updateAccount(account: AccountModel) {
    const updateAccountDialogRef = this.dialog.open(
      UpdateAccountDialogComponent,
      {
        width: "50%",
        data: account
      }
    );
    updateAccountDialogRef.afterClosed().subscribe(() => {
      this.getAccountsData();
    });
  }

  private getAccountsData() {
    this.accountService.getAccounts().subscribe(
      dataAccounts => {
        this.accounts = dataAccounts;
      },
      error => console.log("ERROR!!!", error)
    );
  }

  public addAccount() {
    const addAccountDialogRef = this.dialog.open(
      AddAccountComponent,
      {
        width: "50%"
      }
    );
    addAccountDialogRef.afterClosed().subscribe(() => {
      this.getAccountsData();
    })
  }

}
