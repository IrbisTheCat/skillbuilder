import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Skill } from './models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private scheduleSubject = new BehaviorSubject<Map<Date, Skill[]>>(new Map<Date, Skill[]>());
  schedule$ = this.scheduleSubject.asObservable();

  getSchedule(): Map<Date, Skill[]> {
    return this.scheduleSubject.value;
  }

  updateSchedule(date: Date, skills: Skill[]) {
    const currentSchedule = this.scheduleSubject.value;
    currentSchedule.set(date, skills);
    this.scheduleSubject.next(currentSchedule);
  }

  deleteSchedule(date: Date) {
    const currentSchedule = this.scheduleSubject.value;
    currentSchedule.delete(date);
    this.scheduleSubject.next(currentSchedule);
  }
}

