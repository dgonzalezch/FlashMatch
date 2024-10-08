import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonGrid, IonText, IonCol, IonIcon, IonCardContent, IonCard, IonModal, IonDatetimeButton, IonDatetime, IonLabel, IonInput, IonFooter, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonAccordionGroup, IonAccordion, IonItem, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonTextarea, IonSelect, IonSelectOption, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.page.html',
  styleUrls: ['./step-1.page.scss'],
  standalone: true,
  imports: [IonSegmentButton, IonSegment, IonTextarea, IonBreadcrumb, IonBadge, IonItem, IonAccordion, IonAccordionGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonFooter, IonInput, IonLabel, IonDatetime, IonDatetimeButton, IonModal, IonCard, IonCardContent, IonIcon, IonCol, IonText, IonGrid, IonRow, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonBreadcrumbs, IonSelect, IonSelectOption]
})
export default class Step1Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
