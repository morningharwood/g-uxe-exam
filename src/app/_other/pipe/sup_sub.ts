import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supSub',
})
export class SupSubPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return value.replace(/\&(.*?)\;/g, '<sup>&$1;</sup>');;
  }
}
