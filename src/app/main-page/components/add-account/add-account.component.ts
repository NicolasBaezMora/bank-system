import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { PersonService } from '../../services/person.service';
import { BankService } from '../../services/bank.service';
import { CoinService } from '../../services/coin.service';
import { PersonModel } from '../../interfaces/PersonModel';
import { BankModel } from '../../interfaces/BankModel';
import { CoinModel } from '../../interfaces/CoinModel';
import { AccountModel } from '../../interfaces/AccountModel';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  public formAccount: FormGroup = this.formBuilder.group(
    {
      description: [
        "",
        [
          Validators.required
        ]
      ],
      person: [
        ,
        [
          Validators.required
        ]
      ],
      bank: [
        ,
        [
          Validators.required
        ]
      ],
      coin: [
        ,
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
    private thisDialogRef: MatDialogRef<AddAccountComponent>,
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


  public submitFormAccountAdd() {
    this.formAccount.markAllAsTouched();
    if (this.formAccount.invalid) return;
    const accountToAdd: AccountModel = {
      description: this.formAccount.get("description")?.value,
      person: { id: this.formAccount.get("person")?.value },
      bank: { id: this.formAccount.get("bank")?.value },
      coin: { id: this.formAccount.get("coin")?.value }
    };
    this.accountService.addAccount(accountToAdd).subscribe(
      accountAdded => {
        this.closeDialog();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account added successfully',
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
