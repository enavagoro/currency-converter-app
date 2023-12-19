import { Component } from '@angular/core';
import { ConvertService } from '../_services/convert.service';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})
export class ConversionsComponent {
  conversions: any = [];

  constructor(public convertService: ConvertService, private storageService: StorageService, private router: Router) {
    const session = this.storageService.getItem('session')
    if (session) {
      if(!session.isAdmin){
        alert('necesitas ser admin para ingresar a esta sección')
        this.routeTo('convert')
      } else {
        this.convertService.list().subscribe((result: any) => {
          this.conversions = result;
        })
      }
    } else {
      this.routeTo('login')
    }
  }

  formatDate(date: Date) {
    const newDate = new Date(date)
    return newDate.toLocaleString('es-CL').split(',')[0];
  }

  routeTo(route: string) {
    this.router.navigate([`/${route}`])
  }

  closeSession() {
    this.storageService.removeItem('session')
    this.routeTo('login')
  }
}
