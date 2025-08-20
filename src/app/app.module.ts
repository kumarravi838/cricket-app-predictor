import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  // <-- Import CommonModule
import { AppComponent } from './app.component';
import { PredictionComponent } from './prediction/prediction.component';

@NgModule({
  declarations: [
    ////AppComponent,
    //PredictionComponent
  ],
  imports: [
    BrowserModule,
    CommonModule   // <-- Include CommonModule here
  ],
  providers: [],
  //bootstrap: [AppComponent]
})
export class AppModule { }
