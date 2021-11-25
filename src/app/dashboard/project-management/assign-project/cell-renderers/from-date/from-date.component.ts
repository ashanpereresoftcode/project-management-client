import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from "ag-grid-community";

@Component({
  selector: 'app-from-date',
  templateUrl: './from-date.component.html',
  styleUrls: ['./from-date.component.scss']
})
export class FromDateComponent implements OnInit {

  data: any;

  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    if (params && params.data) {
      this.data = params.data;
    }
  }

  refresh(params: ICellRendererParams) {
    this.data = this.getValueToDisplay(params);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params?.data;
  }

}
