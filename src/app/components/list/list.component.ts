import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DateToStringPipe } from '../../pipes/date-to-string.pipe';

const DATA: any[] = [
  { id: 1, title: 'Buy groceries', date: new Date('2022-01-01'), priority: 'High', completed: false },
  { id: 2, title: 'Do laundry', date: new Date('2022-01-02'), priority: 'Medium', completed: true },
  { id: 3, title: 'Clean the house', date: new Date('2022-01-03'), priority: 'Low', completed: false }
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, FormsModule, DateToStringPipe], // TODO: create component for checkbox
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  displayedColumns: string[] = [ 'title', 'date', 'priority', 'completed'];
  dataSource = DATA;
}
