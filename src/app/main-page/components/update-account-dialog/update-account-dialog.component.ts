import { Component, Inject, OnInit } from '@angular/core';
import { AccountModel } from '../../interfaces/AccountModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonModel } from '../../interfaces/PersonModel';
import { BankModel } from '../../interfaces/BankModel';
import { CoinModel } from '../../interfaces/CoinModel';
import { PersonService } from '../../services/person.service';
import { BankService } from '../../services/bank.service';
import { CoinService } from '../../services/coin.service';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-account-dialog',
  templateUrl: './update-account-dialog.component.html',
  styleUrls: ['./update-account-dialog.component.css']
})
export class UpdateAccountDialogComponent implements OnInit {

  public formAccount: FormGroup = this.formBuilder.group(
    {
      description: [
        this.data.description,
        [
          Validators.required
        ]
      ],
      person: [
        this.data.person.id,
        [
          Validators.required
        ]
      ],
      bank: [
        this.data.bank?.id,
        [
          Validators.required
        ]
      ],
      coin: [
        this.data.coin.id,
        [
          Validators.required
        ]
      ]
    }
  );

  public persons: PersonModel[] = [];
  public banks: BankModel[] = [];
  public coins: CoinModel[] = [];

  constructor(
    private thisDialogRef: MatDialogRef<UpdateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountModel,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private personService: PersonService,
    private banksService: BankService,
    private coinService: CoinService
  ) { }


  ngOnInit(): void {

    this.getPersonsData();
    this.getBanksData();
    this.getCoinsData();

  }

  private getPersonsData() {
    this.personService.getPersons().subscribe(
      personsData => this.persons = personsData
    );
  }

  private getBanksData() {
    this.banksService.getBanks().subscribe(
      banksData => this.banks = banksData
    );
  }

  private getCoinsData() {
    this.coinService.getCoins().subscribe(
      coinsData => this.coins = coinsData
    );
  }

  public invalidForm(field: string): Boolean | undefined {
    return this.formAccount.get(field)?.invalid
      && this.formAccount.get(field)?.touched;
  }


  public submitFormAccountUpdate() {
    this.formAccount.markAllAsTouched();
    if (this.formAccount.invalid) return;
    const accountToUpdate: AccountModel = {
      id: this.data.id,
      description: this.formAccount.get("description")?.value,
      person: {id: this.formAccount.get("person")?.value},
      bank: {id: this.formAccount.get("bank")?.value},
      coin: {id: this.formAccount.get("coin")?.value}
    };
    this.accountService.updateAccount(accountToUpdate).subscribe(
      accountUpdated => {
        this.closeDialog();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

  public closeDialog() {
    this.thisDialogRef.close();
  }

}
