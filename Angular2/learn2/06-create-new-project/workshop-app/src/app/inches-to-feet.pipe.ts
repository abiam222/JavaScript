import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inchesToFeet'
})
export class InchesToFeetPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (value.toFixed) {
      return (value / 12).toFixed(2);
    }

    return value;
  }

}
