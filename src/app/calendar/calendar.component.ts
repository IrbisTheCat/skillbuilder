import { ChangeDetectionStrategy, Component, model, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
import { DatepickerComponent } from "../datepicker/datepicker.component";
import { Skill } from '../models/skill.model';
import { ScheduleDisplayComponent } from "../schedule-display/schedule-display.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
  ],
  imports: [MatButtonModule, MatCardModule, MatDatepickerModule, MatListModule, CommonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, DatepickerComponent, ScheduleDisplayComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent implements OnInit {
  constructor(private scheduleService: ScheduleService, private cdr: ChangeDetectorRef) { }
  schedule: Map<Date, Skill[]> = new Map<Date, Skill[]>();
  ngOnInit() {
    this.scheduleService.schedule$.subscribe(schedule => {
      this.schedule = schedule;
      this.cdr.detectChanges(); 
    });
  }
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

  onDateSelected(date: string) {
    this.selectedDate = new Date(date);

  }

  updateDay() {

    //if has date and then 
    if (this.selectedDate != null) {

      const skills: Skill[] = [];

      this.jumpstuff?.selectedOptions.selected.forEach(option => {
        skills.push({ name: option.value, type: 'jump' });
      });
  
      this.spinstuff?.selectedOptions.selected.forEach(option => {
        skills.push({ name: option.value, type: 'spin' });
      });
  
      this.movesstuff?.selectedOptions.selected.forEach(option => {
        skills.push({ name: option.value, type: 'move' });
      });
  
      this.scheduleService.updateSchedule(this.selectedDate, skills);
    }

    this.clearSelection();
    console.log(this.schedule);


  }



}

