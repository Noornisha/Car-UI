import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharingService } from '../service/sharing.service';

interface car {
  price: number,
  name: string,
  model: string,
  year: number,
  description: string,
  image: string;
}

interface filters {
  model: string,
  year: number,
  query: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  FilterForm: FormGroup;
  carYear: number[] = [];
  carModel: string[] = [];
  dataBinding: car[] = [];
  dataCopy: car[] = [];
  dataSave: car[] = [];

  dummyData: car[] = [
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A0',
      year: 2000,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A1',
      year: 2001,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A2',
      year: 2002,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A3',
      year: 2003,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A4',
      year: 2004,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A5',
      year: 2005,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A6',
      year: 2006,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A7',
      year: 2007,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A8',
      year: 2008,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    },
    {
      price: 123456,
      name: '2020 Cherry Red Cars',
      model: 'A9',
      year: 2009,
      description: '',
      image: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'
    }
  ];

  constructor(public fb: FormBuilder, private sharingService: SharingService) { 
    this.dataSave = this.dummyData;
    this.dataBinding = this.dummyData;
    this.FilterForm = this.fb.group({
      carModel: ['all'],
      carYear: ['all'],
      carSearch: ['']
    });
  }

  ngOnInit(): void {
    let filters = localStorage.getItem('filterData');

    if (filters) {
      let f: filters = JSON.parse(filters);

      this.FilterForm.patchValue({
        carModel: f.model,
        carYear: f.year,
        carSearch: f.query
     });
    }

    for(let i = 0; i < this.dummyData.length; i++) {
      this.carModel.push(this.dummyData[i].model);
      this.carYear.push(this.dummyData[i].year);
    }

    this.generateData();
  }

  addItems(): void {
    this.dataBinding = this.dataBinding.concat(this.dummyData);
    this.dataSave = this.dataSave.concat(this.dummyData);
    for(let i = 0; i < this.dummyData.length; i++) {
      this.carModel.push(this.dummyData[i].model);
      this.carYear.push(this.dummyData[i].year);
    }
  }

  onYearChange(val: any): void {
    this.dataCopy = this.dataSave;
    if (val !== 'all') {
      this.dataBinding = this.dataCopy.filter((d) => {
        return d.year === val.value;
      }); 
    }
    console.log(this.FilterForm.controls)
    
  }

  onModelChange(val: any): void {
    this.dataCopy = this.dataSave;
    this.dataBinding = this.dataCopy.filter((d) => {
      return d.model === this.FilterForm.controls['carModel'].value || d.year === this.FilterForm.controls['carYear'].value || d.name === this.FilterForm.controls['carSearch'].value;
    }); 
  }

  onQuery(val: any): void {
    val.target.value
  }

  generateData(): void {
    this.dataCopy = this.dataSave;
    this.dataBinding = this.dataCopy.filter((d) => {
      if (this.FilterForm.controls['carModel'].value !== 'all' && this.FilterForm.controls['carYear'].value !== 'all' && this.FilterForm.controls['carSearch'].value === '' ) {
        return d.model === this.FilterForm.controls['carModel'].value || d.year === this.FilterForm.controls['carYear'].value || d.name === this.FilterForm.controls['carSearch'].value;
      }
      if (this.FilterForm.controls['carModel'].value === 'all' && this.FilterForm.controls['carYear'].value !== 'all' && this.FilterForm.controls['carSearch'].value === '' ) {
        return d.model === this.FilterForm.controls['carModel'].value || d.year === this.FilterForm.controls['carYear'].value || d.name === this.FilterForm.controls['carSearch'].value;
      }
      if (this.FilterForm.controls['carModel'].value !== 'all' && this.FilterForm.controls['carYear'].value === 'all' && this.FilterForm.controls['carSearch'].value === '' ) {
        return d.model === this.FilterForm.controls['carModel'].value || d.year === this.FilterForm.controls['carYear'].value || d.name === this.FilterForm.controls['carSearch'].value;
      }
      return d.model === this.FilterForm.controls['carModel'].value && d.year === this.FilterForm.controls['carYear'].value && d.name === this.FilterForm.controls['carSearch'].value;
    });
    if (this.FilterForm.controls['carModel'].value === 'all' && this.FilterForm.controls['carYear'].value === 'all' && this.FilterForm.controls['carSearch'].value === '') {
      this.dataBinding = this.dataSave;
    }

    localStorage.setItem('filterData', JSON.stringify({
      model: this.FilterForm.controls['carModel'].value,
      year: this.FilterForm.controls['carYear'].value,
      query: this.FilterForm.controls['carSearch'].value,
    }));
  }

  openDetails(data: car): void {
    this.sharingService.formData = data;
  }
}
