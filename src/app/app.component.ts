import { Component } from '@angular/core';
import { PredictionComponent } from './prediction/prediction.component';  // Import PredictionComponent

@Component({
  selector: 'app-root',
  standalone: true,  // Declare it as standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [PredictionComponent]  // Import PredictionComponent here to use it
})
export class AppComponent {
  title = 'cricket-prediction';
}
