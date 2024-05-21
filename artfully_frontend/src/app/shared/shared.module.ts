import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTypeComponent } from './event-type/event-type.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    EventTypeComponent
  ],
  imports: [
    CommonModule,
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
  exports: [
    EventTypeComponent
  ]
})
export class SharedModule { }
