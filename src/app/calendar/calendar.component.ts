import { ChangeDetectionStrategy, Component, model, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
  ],
  imports: [MatButtonModule, MatCardModule, MatDatepickerModule, MatListModule, CommonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent {
  constructor(private scheduleService: ScheduleService) { }

  deleteOption(arg0: Date) {
    this.schedule.delete(arg0);
  }

  selected = model<Date | null>(null);
  schedule = this.scheduleService.getSchedule();
  jumps: string[] = ['Axel', 'Salchow', 'Toeloop', 'Loop', 'Flip'];
  spins: string[] = ['Camel', 'Flying Camel', 'Sit'];
  moves: string[] = ['Twizzle', 'Swizzle'];

  @ViewChild('jumpstuff', { static: true }) jumpstuff: MatSelectionList | undefined;
  @ViewChild('spinstuff', { static: true }) spinstuff: MatSelectionList | undefined;
  @ViewChild('movesstuff', { static: true }) movesstuff: MatSelectionList | undefined;

  selectedDate: Date | null = null;



  clearSelection() {
    this.jumpstuff?.deselectAll()
    this.spinstuff?.deselectAll()
    this.movesstuff?.deselectAll()
  }

  updateDay() {

    //if has date and then 
    if (this.selectedDate != null) {
      this.schedule.set(
        this.selectedDate,
        {
          jumps: this.jumpstuff?.selectedOptions.selected.map(option => option.value as string),
          spins: this.spinstuff?.selectedOptions.selected.map(option => option.value as string),
          moves: this.movesstuff?.selectedOptions.selected.map(option => option.value as string)
        }
      )
      console.log(this.schedule.get(this.selectedDate)?.jumps?.toString())
    }

    this.clearSelection();


  }



}


export type Activity = {
  jumps: string[] | undefined;
  spins: string[] | undefined;
  moves: string[] | undefined;
};
