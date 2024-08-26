import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DateToStringPipe } from '../../pipes/date-to-string.pipe';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { compareCompleted, compareDate, comparePriority, compareString } from '../../shared/compare';

const DATA: any[] = [
  { id: 1, title: 'Buy groceries', date: new Date('2022-01-01'), priority: 'High', completed: false },
  { id: 2, title: 'Do laundry', date: new Date('2022-01-02'), priority: 'Medium', completed: true },
  { id: 3, title: 'Clean the house', date: new Date('2022-01-03'), priority: 'Low', completed: false }
];

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    DateToStringPipe,

  ], // TODO: create component for checkbox
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements AfterViewInit, OnDestroy{
  @Input() displayedColumns: string[] | null = [];
  @Input() dataSource: any[] | null = [];
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  sortSubscription: Subscription | undefined;

  ngAfterViewInit() {
    this.sortSubscription = this.sort?.sortChange.subscribe(sort => this.handleSortChange(sort));
  }

  handleSortChange(sort: Sort) {
    this.dataSource = this.dataSource?.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compareString(a.title, b.title, isAsc);
        case 'date': return compareDate(a.date, b.date, isAsc);
        case 'priority': return comparePriority(a.priority, b.priority, isAsc);
        case 'completed': return compareCompleted(a.completed, b.completed, isAsc);
        default: return 0;
      }
    }) ?? [];
    this.table?.renderRows();
  }

  ngOnDestroy() {
    this.sortSubscription?.unsubscribe();
  }

}
