import { Injectable } from '@angular/core';
import {Activity} from  '../app/calendar/calendar.component'
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule = new Map<Date, Activity>();

  getSchedule(): Map<Date, Activity> {
    return this.schedule;
  }

  setActivity(date: Date, activity: Activity): void {
    this.schedule.set(date, activity);
  }

  removeActivity(date: Date): void {
    this.schedule.delete(date);
  }
}

