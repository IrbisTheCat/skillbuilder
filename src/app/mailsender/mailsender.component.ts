import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { Console } from 'console';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { figureSkatingElements } from '../consts/urls';
@Component({
  selector: 'app-mailsender',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mailsender.component.html',
  styleUrl: './mailsender.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MailsenderComponent {

  emailForm: FormGroup;
  private apiUrl =  environment.apiUrl;
  

  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private http: HttpClient) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      destinationEmail: ['', [Validators.required, Validators.email]]
    });

  }

  get email() {
    return this.emailForm.get('email');
  }

  get destinationEmail() {
    return this.emailForm.get('destinationEmail');
  }

  onSubmit() {
    //console.log(this.emailForm.valid)
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

      value['jumps']?.forEach(element => {
        result.push({
          date: prettyDay,
          move: element,
          link: figureSkatingElements[element as keyof typeof figureSkatingElements] || null
        });
      });

      value['spins']?.forEach(element => {
        result.push({
          date: prettyDay,
          move: element,
          link: figureSkatingElements[element as keyof typeof figureSkatingElements] || null
        });
      });

      value['moves']?.forEach(element => {
        result.push({
          date: prettyDay,
          move: element,
          link: figureSkatingElements[element as keyof typeof figureSkatingElements] || null
        });
      });

    });


    const data = {
        'tasks': result,
        'from':this.emailForm.get('email')?.value,
        'to': this.emailForm.get('destinationEmail')?.value,
        'subject': 'Schedule update!'

    }

    console.log(`${this.apiUrl}/send`)



    this.http.post<any>(`${this.apiUrl}/send`, data)
    .subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  

    //return this.http.post<any>(`${this.apiUrl}/send`, data);


  }



}
