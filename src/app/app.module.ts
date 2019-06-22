import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeHtmlPipe } from './pipes/safeHtml';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatGridListModule, 
    HttpClientModule, 
    MatTabsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule
  ],
  declarations: [AppComponent, HelloComponent, SafeHtmlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
