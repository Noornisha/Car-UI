import { Component, OnInit } from '@angular/core';
import { SharingService } from '../service/sharing.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  data: any = {};
  constructor(private sharingService: SharingService) { }

  ngOnInit(): void {
    this.data = this.sharingService.formData;
    console.log( this.data);
  }

}
