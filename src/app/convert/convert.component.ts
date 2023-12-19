import { Component } from '@angular/core';
import { ConvertService } from '../_services/convert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

export interface Conversion {
  operationDate: Date,
  amount: number,
  conversionDate: Date,
  currencyValue: number,
  convertedAmount: number,
};

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent {
  convertForm: any;
  loadingButton = false;

  showResult = false;
  result: any;
  isAdmin = false;

  constructor(public convertService: ConvertService, private storageService: StorageService, private formBuilder: FormBuilder, private router: Router) { 
    const session = this.storageService.getItem('session')
    if(session){
      this.isAdmin = session.isAdmin ? true : false
      this.convertForm = this.formBuilder.group({
        amount: [0, [Validators.required]],
        conversionDate : [new Date(), Validators.required]
      }); 
    } else {
      this.routeTo('login')
    }  
  }

  convert(){
    this.loadingButton = true;
    this.showResult = false;

    const amount = this.convertForm.value.amount || 0;
    const conversionDate = this.convertForm.value.conversionDate || new Date();
    this.convertService.convert(amount, conversionDate).subscribe((result: any) => {
      this.showResult = true;
      this.loadingButton = false;
      console.log(result);
      this.result = result
    }, err=>{
      alert('Ha ocurrido un error al ejecutar la conversion')
    })
  }

  formatDate(date: Date){
    const newDate = new Date(date)    
    return newDate.toLocaleString('es-CL').split(',')[0];
  }

  routeTo(route: string){
    this.router.navigate([`/${route}`])
  }

  closeSession(){
    this.storageService.removeItem('session')
    this.routeTo('login')
  }
}
