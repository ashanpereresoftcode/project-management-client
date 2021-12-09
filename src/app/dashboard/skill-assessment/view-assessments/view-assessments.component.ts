import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ColDef, GridApi, GridOptions } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreateAssessmentComponent } from '../create-assessment/create-assessment.component';
import { SkillCellRendererComponent } from '../skill-cell-renderer/skill-cell-renderer.component';
import { SkillAssessmentService } from '../../../shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-assessments',
  templateUrl: './view-assessments.component.html',
  styleUrls: ['./view-assessments.component.scss']
})
export class ViewAssessmentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['skill-name', 'skill-code', 'description', 'action'];
  dataSource: any = new MatTableDataSource<any>();

  skillSubscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private skillAssessmentService: SkillAssessmentService) {
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
