import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { HttpClientModule } from '@angular/common/http';
import { CabinetMedicalService } from './services/cabinet-medical.service';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { PatientComponent, DialogOverviewExampleDialog } from './patient/patient.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatChipsModule,MatCardModule, MatDialogModule,MatFormFieldModule,
  MatInputModule, MatRippleModule } from '@angular/material';
  import { FormsModule }    from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    InfirmierComponent,
    PatientComponent,
    HomeComponent,
    DialogOverviewExampleDialog,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FormsModule
    
  ],
  providers: [CabinetMedicalService],
  bootstrap: [AppComponent,
    DialogOverviewExampleDialog]
})
export class AppModule { }
