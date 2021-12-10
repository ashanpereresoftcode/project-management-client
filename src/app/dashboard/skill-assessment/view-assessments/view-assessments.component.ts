import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ColDef, GridApi, GridOptions } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as XLSX from 'xlsx';
import { CreateAssessmentComponent } from '../create-assessment/create-assessment.component';
import { SkillCellRendererComponent } from '../skill-cell-renderer/skill-cell-renderer.component';
import { SkillAssessmentService } from '../../../shared/services';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-assessments',
  templateUrl: './view-assessments.component.html',
  styleUrls: ['./view-assessments.component.scss']
})
export class ViewAssessmentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @BlockUI() blockUI!: NgBlockUI;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['skill-name', 'skill-code', 'description', 'action'];
  dataSource: any = new MatTableDataSource<any>();

  skillSubscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private skillAssessmentService: SkillAssessmentService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.loadSkillData();
    this.skillCreateListener();
    this.skillDeleteListener();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadSkillData = () => {
    this.skillAssessmentService.getAllSkills().subscribe(serviceResult => {
      if (serviceResult && serviceResult.validity) {
        this.dataSource.data = serviceResult.result;
      }
    }, error => {
      console.log(error);
    });
  }

  skillCreateListener = () => {
    this.skillSubscriptions.push(this.skillAssessmentService.afterSave.subscribe(result => {
      if (result) {
        this.loadSkillData();
      }
    }))
  }

  skillDeleteListener = () => {
    this.skillSubscriptions.push(this.skillAssessmentService.afterDelete.subscribe(result => {
      if (result) {
        this.loadSkillData();
      }
    }))
  }

  onFileSelected = (event: any) => {
    this.blockUI.start('Processing...');
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const skills = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      // service call.
      this.skillAssessmentService.uploadSkills(skills).subscribe(serviceRes => {
        if (serviceRes) {
          this.toastrService.success('Successfully uploaded.', 'Success');
        }
        this.blockUI.stop();
      }, error => {
        console.log(error);
        this.blockUI.stop();
      })
    };
  }

  openModal = () => {
    this.dialog.open(CreateAssessmentComponent, {
      width: '50%',
      height: 'auto',
      data: null
    });
  }

  ngOnDestroy = () => {
    if (this.skillSubscriptions && this.skillSubscriptions.length > 0) {
      this.skillSubscriptions.forEach(e => {
        e.unsubscribe();
      })
    }
  }
}
