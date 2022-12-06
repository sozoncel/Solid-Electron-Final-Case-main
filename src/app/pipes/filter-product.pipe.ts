import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(value: Product[], searchedWord:string) {
    if(!searchedWord) return value;

    return value.filter((product) => product.name.toLocaleLowerCase().includes(searchedWord.toLowerCase()));//girilen input değeri product name içersinde varsa return et...
    
  }
}
