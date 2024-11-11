import { Component } from '@angular/core';
import { Contacto2Component } from '../../pages/contacto2/contacto2.component';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { HomeComponent } from "../../pages/home/home.component";
@Component({
  selector: 'app-contacto22',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HomeComponent, Contacto2Component],
  templateUrl: './contacto22.component.html',
  styleUrl: './contacto22.component.scss'
})
export class Contacto22Component {

}
