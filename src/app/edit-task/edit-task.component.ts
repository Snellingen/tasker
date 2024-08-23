import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  pageTitle = 'Edit Task';
  @Input() id: string | undefined;

  title: string = '';
  date: string = '';
  priority: string = '';

  ngOnInit() {

    console.log('id', this.id);
    if (this.id) {
      this.pageTitle = 'Edit Task ' + this.id;
    }
  }
}
