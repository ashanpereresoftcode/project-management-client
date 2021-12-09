import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColDef, GridApi, GridOptions } from "ag-grid-community";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ProjectCodeComponent } from '../cell-renderers/project-code/project-code.component';
import { ProjectAllocationComponent } from '../cell-renderers/project-allocation/project-allocation.component';
import { ProjectNameComponent } from '../cell-renderers/project-name/project-name.component';
import { ProjectAllocation } from '../../../../shared/enums/project-allocation.enum';
import { FileService } from '../../../../shared/services/file.service';
import * as moment from 'moment';
import { FromDateComponent } from '../cell-renderers/from-date/from-date.component';
import { ToDateComponent } from '../cell-renderers/to-date/to-date.component';

@Component({
  selector: 'app-assigned-projects-report',
  templateUrl: './assigned-projects-report.component.html',
  styleUrls: ['./assigned-projects-report.component.scss']
})
export class AssignedProjectsReportComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;

  gridApi!: GridApi;
  gridColumnApi: any;
  projectAllocation: any = ProjectAllocation;
  columnDefs!: ColDef[];
  defaultColDef!: ColDef;
  rowData: any[] = [];
  gridOption!: GridOptions;
  user: any;

  constructor(
    public matDialogRef: MatDialogRef<AssignedProjectsReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService
  ) {
    this.columnDefs = [
      {
        headerName: 'Project Name',
        suppressAutoSize: true,
        width: 120,
        cellRendererFramework: ProjectNameComponent
      },
      {
        headerName: 'Project Code',
        suppressAutoSize: true,
        width: 120,
        cellRendererFramework: ProjectCodeComponent
      },
      {
        headerName: 'From Date',
        suppressAutoSize: true,
        width: 120,
        cellRendererFramework: FromDateComponent
      },
      {
        headerName: 'To Date',
        suppressAutoSize: true,
        width: 120,
        cellRendererFramework: ToDateComponent
      },
      {
        headerName: 'Comments',
        field: 'comments',
        suppressAutoSize: true,
        width: 120,
      }
    ];
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {
    if (this.data) {
      this.user = this.data?.user;
      this.rowData = this.data?.user?.assignedProjects;
    }
  }

  onGridReady = (params: any) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.sizeToFit();
  }

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  }

  generatePdf = () => {
    this.blockUI.start('Exporting Pdf...');
    const pdfData: any[] = this.rowData.map(x => {
      return {
        'Project Name': x?.project?.projectName,
        'Project Code': x?.project?.projectCode,
        'From Date': moment(x?.fromDate).format('YYYY-MM-DD'),
        'To Date': moment(x?.toDate).format('YYYY-MM-DD'),
        'Allocated Hours': x?.allocationHours,
        'Created On': moment(x?.createdOn).format('YYYY-MM-DD'),
      }
    });
    const headers: any[] = ['Project Name', 'Project Code', 'From Date', 'To Date', 'Allocated Hours', 'Created On'];
    this.fileService.generateReport('Project Allocation', headers, pdfData, "project-allocation-report", this.user, 'Project Allocation Report', true);
    this.blockUI.stop();
  }

  getRatingCard = (rate: number): string => {
    let ratingCard: string = "";
    switch (rate) {
      case 0:
        ratingCard = "N/A";
        break;
      case 1:
        ratingCard = "Fundamental Awareness (basic knowledge)";
        break;
      case 2:
        ratingCard = "Novice (limited experience)";
        break;
      case 3:
        ratingCard = "Intermediate (practical application)";
        break;
      case 4:
        ratingCard = "Advanced (applied theory)";
        break;
      case 5:
        ratingCard = "Expert (recognized authority)";
        break;
    }
    return ratingCard;
  }


  closeModal = () => {
    this.matDialogRef.close();
  }
}
