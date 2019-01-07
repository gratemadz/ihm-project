import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { CabinetMedicalService } from '../services/cabinet-medical.service';
import { PatientInterface } from '../dataInterfaces/patient';
import { sexeEnum } from '../dataInterfaces/sexe';
import { Adresse } from '../dataInterfaces/adresse';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

 nom:string;

  

  patients: PatientInterface[] = [];
  private _cms: CabinetMedicalService;



  public get cms(): CabinetMedicalService {
    return this._cms;
  }


  public set cms(value: CabinetMedicalService) {
    this._cms = value;
  }

  constructor(private cabinetMedicalService: CabinetMedicalService, private _http: HttpClient, public dialog: MatDialog) {
    this._cms = cabinetMedicalService;
    console.log('In Secetary Component Constructor calling CabinetMedicalService.getData');
  }



  getDatas() {
    this.getData('/data/cabinetInfirmier.xml');
  }

  getData(url: string) {
    this.cabinetMedicalService.getData(url)
      .then((data) => {
        console.log('--success > data patientsNonAffectés: ', data.patientsNonAffectés);
        if (this.patients) {
          this.patients = data.patientsNonAffectés;
        }
        console.log('--success > data patientsNonAffectés: ', this.patients);
      })
      .catch((error) => {
        console.log('error > err: ', error);
      });
  }

  ngOnInit() {
    this.getDatas();
  }

  addPatient() {
    console.log('addPatient:::');
  }

  openDialog(): void {
    this.nom="";
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data:{nom:this.nom}
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nom=result;
      const address: Adresse = {
        ville: 'ville',
        codePostal: 12350,
        rue: 'string',
        numéro: 'string',
        étage: 'string'
      }
  
      const patient: PatientInterface = {
        prénom: "",
        nom: this.nom,
        sexe: sexeEnum.M,
        numéroSécuritéSociale: "4748",
        adresse: address
      }

      this.cabinetMedicalService.addPatient(patient)
      .then(function (res) {
        console.log('res:::', res);
      })
      .catch(function (error) {
        console.log('error:::', error);
      });
    });
    

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
