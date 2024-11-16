import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FaqService } from '../services/faq.service';
import { responseSuccess } from '../interfaces/response-success.interface';
import { AlertService } from '../shared/common/alert.service';
import { responseError } from '../interfaces/response-error.interface';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
  standalone: true,
  imports: [IonFooter, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export default class AyudaPage implements OnInit {

  faqService = inject(FaqService);
  alertService = inject(AlertService);
  faqs = signal<any>([]);


  ngOnInit() {
    this.getListFaq();
  }

  getListFaq(): void {
    this.faqService.getAllFaq().subscribe({
      next: (resp: responseSuccess) => {
        this.faqs.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  // Método para trackBy en *ngFor
  trackByIndex(index: number, item: any) {
    return index;
  }

}
