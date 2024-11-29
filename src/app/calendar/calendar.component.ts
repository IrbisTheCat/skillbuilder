import { ChangeDetectionStrategy , Component, model,ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSelectionList} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-calendar',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),   
],
  imports: [MatButtonModule,MatCardModule, MatDatepickerModule,MatListModule,CommonModule,MatIconModule, MatInputModule,MatFormFieldModule,FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CalendarComponent {
deleteOption(arg0: Date) {
    this.schedule.delete(arg0);
    this.generateMailtoLink();
}

sendToUser() {
throw new Error('Method not implemented.');
}

  selected = model<Date | null>(null);
  schedule = new Map<Date, Activity>();
  jumps: string[] = ['Axel', 'Salchow', 'Toeloop', 'Loop', 'Flip'];
  spins: string[] = [ 'Camel', 'Flying Camel', 'Sit'];
  moves: string[] = [ 'Twizzle', 'Swizzle'];

  @ViewChild('jumpstuff', {static: true}) jumpstuff: MatSelectionList | undefined;
  @ViewChild('spinstuff', {static: true}) spinstuff: MatSelectionList | undefined;
  @ViewChild('movesstuff', {static: true}) movesstuff: MatSelectionList | undefined;

  selectedDate: Date | null = null;



  clearSelection() {
    this.jumpstuff?.deselectAll()
    this.spinstuff?.deselectAll()
    this.movesstuff?.deselectAll()
  }

  updateDay() {
    
      //if has date and then 
      if(this.selectedDate!= null ){
        this.schedule.set(
          this.selectedDate,
          { 
            jumps: this.jumpstuff?.selectedOptions.selected.map(option => option.value as string), 
            spins:this.spinstuff?.selectedOptions.selected.map(option => option.value as string),
            moves:this.movesstuff?.selectedOptions.selected.map(option => option.value as string)
          }
        )
        console.log(this.schedule.get(this.selectedDate)?.jumps?.toString())
      } 

      this.clearSelection();

     
      
      this.generateMailtoLink();
  }


 generateMailtoLink(){

    var body ="";

    this.schedule.forEach((activity, day)=>
    {
    
      var date = day.toLocaleDateString();
    
      body += `Activities for ${date}:\n\n`;
    
        // Add activities to the body
      if (activity.jumps && activity.jumps.length > 0) {
        body += 'Jumps:\n' + activity.jumps.join('\n') + '\n\n';
      }
      if (activity.spins && activity.spins.length > 0) {
        body += 'Spins:\n' + activity.spins.join('\n') + '\n\n';
      }
      if (activity.moves && activity.moves.length > 0) {
        body += 'Moves:\n' + activity.moves.join('\n') + '\n\n';
      }
      body+='------------------------------------------------\n\n'
   
    }
          
    )





    // Encode the body and create the mailto link
    var mailtoLink = `mailto:?subject=Activity Schedule &body=${encodeURIComponent(body)}`;
    //console.log(mailtoLink)
    var link = document.getElementById('sendlink')   as HTMLAnchorElement;
    if (link) {
      // Update the href value
      link.href = mailtoLink;
    }
  }
}




  


type Activity = {
  jumps: string[] | undefined;
  spins: string[] | undefined;
  moves: string[] | undefined;
};
