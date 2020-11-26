import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { NewContactWindowComponent } from './components/contact-list/new-contact-window/new-contact-window.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContactDetailWindowComponent } from './components/contact-list/contact-detail-window/contact-detail-window.component';
import {ContactFullNamePipe} from './shared/pipes/contact-full-name.pipe';
import {MatSortModule} from '@angular/material/sort';
import { StoreModule } from '@ngrx/store';
import { contactReducer } from './reducers/contact.reducer'


@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    NewContactWindowComponent,
    ContactDetailWindowComponent,
    ContactFullNamePipe
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ contacts: contactReducer })
  ],
  providers: [ContactFullNamePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
