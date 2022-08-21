import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PersonModel } from '../../interfaces/PersonModel';
import { PersonService } from '../../services/person.service';
import { AddPersonComponent } from '../add-person/add-person.component';

@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.css']
})
export class UpdatePersonComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private thisDialogRef: MatDialogRef<AddPersonComponent>,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) private personData: PersonModel
  ) { }

  public formPerson: FormGroup = this.formBuilder.group(
    {
      name: [
        this.personData.name,
        [
          Validators.required
        ]
      ],
      lastname: [
        this.personData.lastname,
        [
          Validators.required
        ]
      ],
      email: [
        this.personData.email,
        [
          Validators.required
        ]
      ],
      phone: [
        this.personData.phone,
        [
          Validators.required
        ]
      ]
    }
  );

  ngOnInit(): void {
  }

  public invalidForm(value: string): Boolean | undefined {
    return this.formPerson.get(value)?.invalid 
      && this.formPerson.get(value)?.touched;
  }

  public closeDialog() {
    this.thisDialogRef.close();
  }

  public submitFormPersonUpdate() {
    this.formPerson.markAllAsTouched();
    if (this.formPerson.invalid) return;
    const personToAdd: PersonModel = {
      id: this.personData.id,
      name: this.formPerson.get("name")?.value,
      lastname: this.formPerson.get("lastname")?.value,
      email: this.formPerson.get("email")?.value,
      phone: this.formPerson.get("phone")?.value
    }
    this.personService.updatePerson(personToAdd).subscribe(
      personUpdated => {
        this.closeDialog();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Person updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }
}
