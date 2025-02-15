import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-datepicker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, FormsModule,MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.css'
})
export class DatepickerComponent {
  @Output() dateSelected=  new EventEmitter<string>();

  onDateChange(event: any) {
    const selectedDate = event.target.value; // Adjust this based on your datepicker implementation
    this.dateSelected.emit(selectedDate);
   
  }
}
