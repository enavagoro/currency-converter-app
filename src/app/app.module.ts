import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; //Protocolo http para que los servicios se comuniquen con la api

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConvertComponent } from './convert/convert.component';
import { ConversionsComponent } from './conversions/conversions.component'; 
import { ConvertService } from './_services/convert.service';
import { AuthService } from './_services/auth.service';
import { StorageService } from './_services/storage.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConvertComponent,
    ConversionsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule
  ],
  providers: [ConvertService, AuthService, StorageService],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
