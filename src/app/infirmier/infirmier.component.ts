import { Component, OnInit } from '@angular/core';

import { CabinetMedicalService } from '../services/cabinet-medical.service';
import { InfirmierInterface } from '../dataInterfaces/infirmier';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit {

  infirmiers:InfirmierInterface[]= [];
  private _cms: CabinetMedicalService;

  public get cms(): CabinetMedicalService {
      return this._cms;
  }

  public set cms(value: CabinetMedicalService) {
      this._cms = value ;
  }
  
  constructor(private cabinetMedicalService: CabinetMedicalService){    
    this._cms  = cabinetMedicalService;
    console.log('In Secetary Component Constructor calling CabinetMedicalService.getData');
  }

  

  getDatas(){
    this.getData('/data/cabinetInfirmier.xml');
  }

  getData(url: string){
    this.cabinetMedicalService.getData(url)
    .then((data)=>{
      console.log('--success > data patientsNonAffectés: ',data.patientsNonAffectés);
      if(this.infirmiers){
        this.infirmiers =  data.infirmiers ; 
      }   
      console.log('--success > data patientsNonAffectés: ',this.infirmiers);
    })
    .catch((error)=>{
      console.log('error > err: ',error);
    });
  }
  
  ngOnInit() {
    this.getDatas();
  }

}
