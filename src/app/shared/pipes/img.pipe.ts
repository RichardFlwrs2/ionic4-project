import { Pipe, PipeTransform } from "@angular/core";
import { StorageService } from "src/app/services/auth/storage.service";

@Pipe({
  name: "img"
})
export class ImgPipe implements PipeTransform {
  constructor(private _sts: StorageService) {}

  transform(ITEMS: any[], TEXT: string): any {
    if (!ITEMS) return [];

    if (!TEXT) return ITEMS;
    return null;
  }
}
