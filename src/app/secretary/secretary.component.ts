import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { CabinetMedicalService } from '../services/cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';


@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {
  private _cms: CabinetMedicalService;

  cabinet = <CabinetInterface> {};

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

  ngOnInit() {
    //this.getData('/data/cabinetInfirmier.xml');
  } 

  getDatas(){
    this.getData('/data/cabinetInfirmier.xml');
  }

  getData(url: string){
    this.cabinetMedicalService.getData(url)
    .then((data)=>{
      console.log('success > data: ',data);
      if(this.cabinet){
        this.cabinet =  data ; 
      }   
    })
    .catch((error)=>{
      console.log('error > err: ',error);
    });
  }
  
}
