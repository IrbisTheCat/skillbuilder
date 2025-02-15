import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Console } from 'console';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { figureSkatingElements } from '../consts/urls';
import {MatIconModule} from '@angular/material/icon';
import { Skill } from '../models/skill.model';

@Component({
  selector: 'app-mailsender',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, CommonModule,MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mailsender.component.html',
  styleUrl: './mailsender.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailsenderComponent implements OnInit{
  schedule: Map<Date, Skill[]> = new Map<Date, Skill[]>();
  emailForm: FormGroup;
  private apiUrl =  environment.apiUrl;
  hide = signal(true);  

  ngOnInit() {
    this.scheduleService.schedule$.subscribe(schedule => {
      this.schedule = schedule;
      this.cdr.detectChanges(); 
    });
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private http: HttpClient , private cdr: ChangeDetectorRef) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      destinationEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordMatcher()]]
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  get destinationEmail() {
    return this.emailForm.get('destinationEmail');
  }

  onSubmit() {

    if (this.emailForm.valid) {
      this.sendmail();
      alert('Email sent successfully!');
      this.emailForm.reset();
    }
  }

   formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
  sendmail() {

    const skatingMap = this.scheduleService.getSchedule();
    const result: { date: string; move: string; link: string | null }[] = [];

    //console.log("-------------------------")
    

    skatingMap.forEach((value, key) => {
      const prettyDay =this.formatDate(key); // Extract date (YYYY-MM-DD)

      value.forEach((element: Skill) => {
        result.push({
          date: prettyDay,
          move: element.name,
          link: figureSkatingElements[element.name as keyof typeof figureSkatingElements] || null
        });
      });
    });


    const data = {
        'tasks': result,
        'from':this.emailForm.get('email')?.value,
        'to': this.emailForm.get('destinationEmail')?.value,
        'key': this.emailForm.get('password')?.value,
        'subject': 'Schedule update!'

    }

    console.log(data)


    this.http.post<any>(`${this.apiUrl}`, data)
    .subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.resetForm();
      },
      error: (err) => {
        console.error('Error:', err);
            this.resetForm();
      }
    });
  

    //return this.http.post<any>(`${this.apiUrl}/send`, data);


  }
  resetForm() {
    this.emailForm.reset();
    Object.keys(this.emailForm.controls).forEach((key) => {
      let control = this.emailForm.get(key);
      control?.setErrors(null);
      control?.markAsPristine();
      control?.markAsUntouched();
    });
  }



}
 export   function passwordMatcher(): ValidatorFn  {
  return (control: AbstractControl): ValidationErrors | null => {
    // Example check for at least one uppercase letter
    if (control.value  == null) {
      return { passwordMismatch: 'Enter PWD' };
    }
    return null;  // Return null if valid
  };
 // return emailForm.get('password')?.value!=.accesspassword;
}
