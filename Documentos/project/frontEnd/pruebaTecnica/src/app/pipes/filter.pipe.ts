import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultP = [];
    for(const p of value){
      if(p.nombre.indexOf(arg) > -1){
         resultP.push(p);
      };
    };
    return resultP;
  }

}
