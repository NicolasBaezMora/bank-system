import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { BanksComponent } from './pages/banks/banks.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { CoinsComponent } from './pages/coins/coins.component';

const routes: Routes = [
  {
    path: "accounts",
    component: AccountsComponent,
    pathMatch: "full"
  },
  {
    path: "banks",
    component: BanksComponent,
  },
  {
    path: "persons",
    component: PersonsComponent
  },
  {
    path: "coins",
    component: CoinsComponent
  },
  {
    path: "**",
    redirectTo: "accounts"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
