import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CalendarComponent } from "../calendar/calendar.component";
import { MailsenderComponent } from "../mailsender/mailsender.component";
import { PremadeComponent } from "../premade/premade.component";


@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatTabsModule, CalendarComponent, MailsenderComponent, PremadeComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {

}
