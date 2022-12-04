import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let res = '';
    if (
      /\.png$/.test(value.valueOf()) ||
      /\.jpg$/.test(value.valueOf()) ||
      /\.svg$/.test(value.valueOf()) ||
      /\.bitmap$/.test(value.valueOf()) ||
      /\.icn$/.test(value.valueOf())
    ) {
      res += 'picture-icn ';
    } else if (
      /\.rar$/.test(value.valueOf()) ||
      /\.zip$/.test(value.valueOf()) ||
      /\.rip$/.test(value.valueOf()) ||
      /\.7z$/.test(value.valueOf())
    ) {
      res += 'rar-icn ';
    } else {
      res += 'doc-icn ';
    }
    return res;
  }
}
