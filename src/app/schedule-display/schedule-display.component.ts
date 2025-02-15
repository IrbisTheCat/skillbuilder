import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../models/skill.model';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-schedule-display',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButtonModule],
  providers: [  provideNativeDateAdapter()],
  templateUrl: './schedule-display.component.html',
  styleUrl: './schedule-display.component.css'
})
export class ScheduleDisplayComponent  {
  @Input() schedule: Map<Date, Skill[]> = new Map<Date, Skill[]>();

  
  constructor(private scheduleService: ScheduleService) {}


  deleteOption(date: Date) {
    this.scheduleService.deleteSchedule(date);
  }
}
