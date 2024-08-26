import { Component, ViewEncapsulation } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-theme-switch',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ThemeSwitchComponent {

  onToggleChange(e: MatSlideToggleChange) {
    if (e.checked) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

}
