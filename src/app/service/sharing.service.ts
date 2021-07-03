import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }

  private data = [];

    get formData(): any {
        return this.data;
    }

    set formData(newData: any) {
      console.log('from service ', newData)
      this.data = newData;
    }
}
