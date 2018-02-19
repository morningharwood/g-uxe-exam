import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaToAnd',
})
export class CommaToAndPipe implements PipeTransform {
  transform(value: string, iteration, length): string {
    let formattedValue;

    if(iteration === length - 1) {
      formattedValue = `and ${value}.`;
    } else {
      formattedValue = `${value},`;
    }
    return formattedValue;
  }
}
