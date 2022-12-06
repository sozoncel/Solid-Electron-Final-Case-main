import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(value: Product[], searchedWord:string) {
    if(!searchedWord) return value;//filtrelenecek input değeri yoksa listeyi geri dön

    return value.filter((product) => product.name.toLocaleLowerCase().includes(searchedWord.toLowerCase()));//girilen input değeri product name içersinde varsa return et...
    //büyük küçük harf duyarlılığı olmaması için gelen değerler lowercase ile tamamı küçük harfe çevrildi

  }
}
