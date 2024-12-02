
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone:true,
})
export class PaginatePipe implements PipeTransform {

  transform(items: any[], page: number = 1, itemsPerPage: number = 10): any[] {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }
}
