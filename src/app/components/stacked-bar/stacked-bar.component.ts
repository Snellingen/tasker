import { Component, Input } from '@angular/core';

export type Stack = {
  label: string;
  value: number;
  colorIndex?: number;
};

type ComputedStack = Stack & { percentage: number; };

@Component({
  selector: 'app-stacked-bar',
  standalone: true,
  imports: [],
  templateUrl: './stacked-bar.component.html',
  styleUrl: './stacked-bar.component.scss'
})

export class StackedBarComponent {
  @Input() set data(value: Stack[] | null | undefined) {
    this._data = value;
    this.computeStacks();
  }
  private _data: Stack[] | null | undefined;
  computedData: ComputedStack[] = [];

  computeStacks() {
    const total = this._data?.reduce((acc, s) => acc + s.value, 0) ?? 0;
    this.computedData = this._data?.map((stack, index) => {
      if (stack.colorIndex === undefined) {
        stack.colorIndex = index + 1;
      }
      return { percentage: (stack.value / total * 100), ...stack } as ComputedStack;
    }) as ComputedStack[];
  }

}
