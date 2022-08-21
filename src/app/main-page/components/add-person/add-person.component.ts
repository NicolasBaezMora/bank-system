import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PersonModel } from '../../interfaces/PersonModel';
import { PersonService } from '../../services/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private thisDialogRef: MatDialogRef<AddPersonComponent>,
    private personService: PersonService
  ) { }

  public formPerson: FormGroup = this.formBuilder.group(
    {
      name: [
        "",
        [
          Validators.required
        ]
      ],
      lastname: [
        "",
        [
          Validators.required
        ]
      ],
      email: [
        "",
        [
          Validators.required
        ]
      ],
      phone: [
        "",
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

  public submitFormPersonAdd() {
    this.formPerson.markAllAsTouched();
    if (this.formPerson.invalid) return;
    const personToAdd: PersonModel = {
      name: this.formPerson.get("name")?.value,
      lastname: this.formPerson.get("lastname")?.value,
      email: this.formPerson.get("email")?.value,
      phone: this.formPerson.get("phone")?.value
    }
    this.personService.addPerson(personToAdd).subscribe(
      personAdded => {
        this.closeDialog();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Person added successfully',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }
}
