import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { BanksComponent } from './pages/banks/banks.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { CoinsComponent } from './pages/coins/coins.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateAccountDialogComponent } from './components/update-account-dialog/update-account-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { UpdatePersonComponent } from './components/update-person/update-person.component';
import { AddCoinComponent } from './components/add-coin/add-coin.component';
import { AddBankComponent } from './components/add-bank/add-bank.component';

@NgModule({
  declarations: [
    HomeComponent,
    BanksComponent,
    AccountsComponent,
    PersonsComponent,
    CoinsComponent,
    UpdateAccountDialogComponent,
    AddAccountComponent,
    AddPersonComponent,
    UpdatePersonComponent,
    AddCoinComponent,
    AddBankComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    RouterModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ],
  exports: [
    HomeComponent
  ]
})
export class MainPageModule { }
