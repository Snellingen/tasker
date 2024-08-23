import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToString',
  standalone: true
})
export class DateToStringPipe implements PipeTransform {

  transform(value: Date, dateStyle: "full" | "long" | "medium" | "short" | undefined, locale?: string): string {
    const options = { dateStyle: dateStyle };
    const resolvedLocale = locale || navigator.language;
    return value.toLocaleDateString(resolvedLocale, options);
  }

}
