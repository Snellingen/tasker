import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { DateToStringPipe } from '../../pipes/date-to-string.pipe';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { compareCompleted, compareDate, comparePriority, compareString } from '../../shared/compare';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    FormsModule,
    DateToStringPipe,

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements AfterViewInit, OnDestroy {
  @Input() displayedColumns: string[] | null = [];
  @Input() dataSource: any[] | null = [];
  @Output() onRowClicked: EventEmitter<any> = new EventEmitter<any>();

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
