import { Component, OnInit } from '@angular/core';
import { PersonModel } from '../../interfaces/PersonModel';
import { PersonService } from '../../services/person.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddPersonComponent } from '../../components/add-person/add-person.component';
import { UpdatePersonComponent } from '../../components/update-person/update-person.component';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  public persons: PersonModel[] = [];

  constructor(
    private personService: PersonService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPersons();
  }

  private getPersons() {
    this.personService.getPersons().subscribe(
      personsData => this.persons = personsData
    );
  }

  public addPerson() {
    const addPersonDialogRef = this.dialog.open(
      AddPersonComponent,
      {
        width: "50%",
      }
    );
    addPersonDialogRef.afterClosed().subscribe(
      () => {
        this.getPersons();
      }
    );
  }
  
  public updatePerson(person: PersonModel) {
    const updatePersonDialogRef = this.dialog.open(
      UpdatePersonComponent,
      {
        width: "50%",
        data: person
      }
    );
    updatePersonDialogRef.afterClosed().subscribe(
      () => {
        this.getPersons();
      }
    );
  }

}
