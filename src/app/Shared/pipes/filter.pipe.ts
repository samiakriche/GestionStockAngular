import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(value: unknown[], filterBy :string ,filterBaseOn :string  ): unknown { 
    if(value ==null){
      return value

    }
    if(value.length===0){
      return value
    }
    const array=[];
    for (const v of value) {
       
       if((v[filterBy] as string).includes(filterBaseOn)){
         array.push(v);
       }
    }
    return array;
  }

}
