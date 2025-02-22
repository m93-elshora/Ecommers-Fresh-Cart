import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(data:any[],searchKey:string): any {
    return data.filter(current=>current.slug.toLowerCase().includes(searchKey.toLowerCase()));
  }

}
