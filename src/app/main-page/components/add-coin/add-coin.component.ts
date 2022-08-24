import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CoinModel } from '../../interfaces/CoinModel';
import { CoinService } from '../../services/coin.service';

@Component({
  selector: 'app-add-coin',
  templateUrl: './add-coin.component.html',
  styleUrls: ['./add-coin.component.css']
})
export class AddCoinComponent implements OnInit {

  public formCoin: FormGroup = this.formBuilder.group(
    {
      name: [
        "",
        [
          Validators.required
        ]
      ]
    }
  );

  constructor(
    private thisDialogRef: MatDialogRef<AddCoinComponent>,
    private formBuilder: FormBuilder,
    private coinService: CoinService
  ) { }


  ngOnInit(): void {

  }


  public invalidForm(field: string): Boolean | undefined {
    return this.formCoin.get(field)?.invalid
      && this.formCoin.get(field)?.touched;
  }


  public submitFormCoinAdd() {
    this.formCoin.markAllAsTouched();
    if (this.formCoin.invalid) return;
    const coinToAdd: CoinModel = {
      name: this.formCoin.get("name")?.value,
    };
    this.coinService.addCoin(coinToAdd).subscribe(
      accountAdded => {
        this.closeDialog();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Coin added successfully',
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
