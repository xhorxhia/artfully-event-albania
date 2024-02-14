import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ConfettiComponent } from './confetti/confetti.component';
import { DasmaKonfetaComponent } from './confetti/dasma-konfeta/dasma-konfeta.component';
import { PagezimeKonfetaComponent } from './confetti/pagezime-konfeta/pagezime-konfeta.component';
import { ContactComponent } from './contact/contact.component';
import { DasmaComponent } from './events/dasma/dasma.component';
import { DitelindjeComponent } from './events/ditelindje/ditelindje.component';
import { EventsComponent } from './events/events.component';
import { FejesaComponent } from './events/fejesa/fejesa.component';
import { PagezimeComponent } from './events/pagezime/pagezime.component';
import { TeTjeraComponent } from './events/te-tjera/te-tjera.component';
import { HomeComponent } from './home/home.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { FejesaKonfetaComponent } from './confetti/fejesa-konfeta/fejesa-konfeta.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'evente', component: EventsComponent},
  {path: 'konfeta', component: ConfettiComponent},
  {path: 'kontakt', component: ContactComponent},
  {path: 'dasma', component: DasmaComponent},
  {path: 'pagezime', component: PagezimeComponent},
  {path: 'ditelindje', component: DitelindjeComponent},
  {path: 'fejesa', component: FejesaComponent},
  {path: 'teTjera', component: TeTjeraComponent},
  {path: 'dasma-konfeta', component: DasmaKonfetaComponent},
  {path: 'pagezime-konfeta', component: PagezimeKonfetaComponent},
  {path: 'fejesa-konfeta', component: FejesaKonfetaComponent},
  {path: 'event/:id', component: SpecificEventComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
