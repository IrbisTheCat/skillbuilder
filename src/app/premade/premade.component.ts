import {NgModule, ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ScheduleService } from '../schedule.service';
import { LessonPlan } from '../models/lessonplan.model';
import { lessonPlans } from '../consts/lessonplans';
import { CommonModule } from '@angular/common';
import { DatepickerComponent } from "../datepicker/datepicker.component";
import { ScheduleDisplayComponent } from "../schedule-display/schedule-display.component";
import { Skill } from '../models/skill.model';

@Component({
  selector: 'app-premade',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, DatepickerComponent, ScheduleDisplayComponent],
  templateUrl: './premade.component.html',
  styleUrl: './premade.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PremadeComponent implements OnInit{
  constructor(private scheduleService: ScheduleService, private cdr: ChangeDetectorRef) { }
  schedule: Map<Date, Skill[]> = new Map<Date, Skill[]>();
  selectedDate: Date | null = null;  
  lessons   = lessonPlans;
  ngOnInit() {
    this.scheduleService.schedule$.subscribe(schedule => {
      this.schedule = schedule;
      this.cdr.detectChanges(); 
    });
  }
  updateDay(lesson:LessonPlan) {
    console.log(lesson.skills)
    if (this.selectedDate != null) {
      this.scheduleService.updateSchedule(this.selectedDate, lesson.skills)
    }

  }


  onDateSelected(date: string) {
    this.selectedDate = new Date(date);
  }


}
