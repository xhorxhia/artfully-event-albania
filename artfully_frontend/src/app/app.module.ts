import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { ConfettiComponent } from './confetti/confetti.component';
import { ContactComponent } from './contact/contact.component';
import { EventService } from 'src/event.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DasmaComponent } from './events/dasma/dasma.component';
import { PagezimeComponent } from './events/pagezime/pagezime.component';
import { DitelindjeComponent } from './events/ditelindje/ditelindje.component';
import { FejesaComponent } from './events/fejesa/fejesa.component';
import { TeTjeraComponent } from './events/te-tjera/te-tjera.component';
import { DasmaKonfetaComponent } from './confetti/dasma-konfeta/dasma-konfeta.component';
import { PagezimeKonfetaComponent } from './confetti/pagezime-konfeta/pagezime-konfeta.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsService } from './events/events.service';
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ConfirmationDialog } from './shared/confirmation-dialog/confirmation-dialog.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CommentSectionComponent } from './specific-event/comment-section/comment-section.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FejesaKonfetaComponent } from './confetti/fejesa-konfeta/fejesa-konfeta.component';
import { EditEventModalComponent } from './shared/edit-event-modal/edit-event-modal.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    EventsComponent,
    ConfettiComponent,
    ContactComponent,
    DasmaComponent,
    PagezimeComponent,
    DitelindjeComponent,
    FejesaComponent,
    TeTjeraComponent,
    DasmaKonfetaComponent,
    PagezimeKonfetaComponent,
    ConfirmationDialog,
    SpecificEventComponent,
    CommentSectionComponent,
    RegisterComponent,
    LoginComponent,
    FejesaKonfetaComponent,
    EditEventModalComponent,
 

    
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    IvyCarouselModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule,
    MatExpansionModule
  ],
  providers: [EventService, EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
