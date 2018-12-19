import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastParam'
})
export class LastParamPipe implements PipeTransform {

  transform(value: any): any {
    let url = value.split('/');
    return url[url.length-2];
  }

}
