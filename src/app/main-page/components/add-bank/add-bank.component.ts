import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BankService } from '../../services/bank.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BankModel } from '../../interfaces/BankModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  public formBank: FormGroup = this.formBuilder.group(
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
    private formBuilder: FormBuilder,
    private bankService: BankService,
    private thisDialog: MatDialogRef<AddBankComponent>
  ) { }

  ngOnInit(): void {
  }

  public closeDialog() {
    this.thisDialog.close();
  }

  public submitFormAddBank() {
    this.formBank.markAllAsTouched();
    if (this.formBank.invalid) return;
    const bankToAdd: BankModel = {
      name: this.formBank.get("name")?.value
    };
    this.bankService.addBank(bankToAdd).subscribe(
      result => {
        this.closeDialog();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Bank added successfully',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error => console.log(error)
    );
  }

  public validateField(value: string): boolean | undefined {
    return this.formBank.get(value)?.invalid &&
      this.formBank.get(value)?.touched;
  }


}
