import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { CabinetInterface } from '../dataInterfaces/cabinet';
import { Adresse } from '../dataInterfaces/adresse';

import { PatientInterface } from '../dataInterfaces/patient';
import { InfirmierInterface } from '../dataInterfaces/infirmier';
import { sexeEnum } from '../dataInterfaces/sexe';


//

@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {


  constructor(private _http: HttpClient) { }

  async getData(url: string): Promise<CabinetInterface> {
    let cabinet: CabinetInterface;

    try {
      const response = await this._http.get(url, { responseType: 'text' }).toPromise();
      const parser = new DOMParser();
      const doc = parser.parseFromString(response, 'application/xml');
      console.log(doc.querySelector('cabinet'));
      let _infirmiers = this.getInfirmiersFrom(doc.getElementsByTagName("infirmier"));
      if (doc) {
        cabinet = <CabinetInterface>{
          infirmiers: _infirmiers,
          patientsNonAffectés: this.getPatientsFrom(doc.getElementsByTagName("patient"), _infirmiers),
          adresse: this.getAdressFrom(doc.querySelector('cabinet')),
        };
      }

    } catch (err) {
      console.error('ERROR in getData', err);
    }

    return cabinet;
  }

  private getAdressFrom(root: Element): Adresse {
    let node: Element;
    return {
      ville: (node = root.querySelector('adresse > ville')
      ) ? node.textContent : '',
      codePostal: (node = root.querySelector('adresse > codePostal')
      ) ? parseInt(node.textContent, 10) : 0,
      rue: (node = root.querySelector('adresse > rue')
      ) ? node.textContent : '',
      numéro: (node = root.querySelector('adresse > numémo')
      ) ? node.textContent : '',
      étage: (node = root.querySelector('adresse > étage')
      ) ? node.textContent : '',
    };

  }
  private getInfirmiersFrom(root: HTMLCollectionOf<Element>): [InfirmierInterface] {
    let infirmiers: any = [];
    let node: Element;
    let minfirmiersArray = Array.from(root);
    for (let i = 0; i < minfirmiersArray.length; i++) {
      let infirmier = {
        id: minfirmiersArray[i].getAttribute("id"),
        prénom: (node = minfirmiersArray[i].querySelector('infirmier > prénom')
        ) ? node.textContent : '',
        nom: (node = minfirmiersArray[i].querySelector('infirmier > nom')
        ) ? node.textContent : '',
        photo: (node = minfirmiersArray[i].querySelector('infirmier > photo')
        ) ? node.textContent : '',
        patients: [],
        adresse: this.getAdressFrom(minfirmiersArray[i])
      };
      // console.log('infirmier: ',infirmier);
      infirmiers.push(infirmier);
    }
    return infirmiers;
  }

  private stringToSexeEnum(str: string): sexeEnum {
    let sexe: sexeEnum;
    switch (str) {

      case 'M': sexe = sexeEnum.M; break;
      case 'F': sexe = sexeEnum.F; break;
      default: ;
    }
    return sexe;
  }

  private getPatientsFrom(root: HTMLCollectionOf<Element>, infirmiers: InfirmierInterface[]): [PatientInterface] {
    let patients: any = [];
    let node: Element;
    let patientsArray = Array.from(root);
    for (let i = 0; i < patientsArray.length; i++) {
      let patient: PatientInterface = {
        nom: (node = patientsArray[i].querySelector('patient > nom')
        ) ? node.textContent : '',
        prénom: (node = patientsArray[i].querySelector('patient > prénom')
        ) ? node.textContent : '',
        sexe: (patientsArray[i].querySelector('patient > sexe').textContent == 'M')
          ? sexeEnum.M : sexeEnum.F,
        numéroSécuritéSociale: (node = patientsArray[i].querySelector('patient > numéro')
        ) ? node.textContent : '',
        adresse: this.getAdressFrom(patientsArray[i])
      };
      //console.log('patient:',patient);

      if (patientsArray[i].querySelector("visite").hasAttribute("intervenant")) {
        let idVisite = patientsArray[i].querySelector("visite").getAttribute("intervenant");
        let intervenant = infirmiers.filter(infirmier => infirmier.id == idVisite);
        intervenant[0].patients.push(patient);
      } else {
        patients.push(patient);
      }

      //console.log('infirmiers:',infirmiers);
    }
    return patients;
  }

  public async addPatient(patient: PatientInterface): Promise<PatientInterface> {
    const res = await this._http.post('/addPatient', {
      patientName: patient.nom,
      patientForname: patient.prénom,
      patientNumber: patient.numéroSécuritéSociale,
      patientSex: patient.sexe === sexeEnum.M ? 'M' : 'F',
      patientBirthday: 'AAAA-MM-JJ',
      patientFloor: patient.adresse.étage,
      patientStreetNumber: patient.adresse.numéro,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    }, { observe: 'response' }).toPromise<HttpResponse<any>>();
    console.log('Add patient renvoie', res);
    if (res.status === 200) {
      // OK on peut ajouter en local
      //this.patients.push(patient);
    }
    return null;
  }

}   
