import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ICellRendererParams } from "ag-grid-community";
import { MatDialog } from '@angular/material/dialog';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreateAssessmentComponent } from '../create-assessment/create-assessment.component';
import { SkillAssessmentService } from '../../../shared/services';
@Component({
  selector: 'app-skill-cell-renderer',
  templateUrl: './skill-cell-renderer.component.html',
  styleUrls: ['./skill-cell-renderer.component.scss']
})
export class SkillCellRendererComponent implements OnInit, OnDestroy {

  @Input() skill!: any;
  @BlockUI() blockUI!: NgBlockUI;

  skillSubscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog, private skillAssessmentService: SkillAssessmentService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    // if (params && params.data) {
    //   this.skill = params.data;
    // }
  }

  refresh(params: ICellRendererParams) {
    // this.skill = this.getValueToDisplay(params);
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

  openModal = () => {
    this.dialog.open(CreateAssessmentComponent, {
      width: '50%',
      height: 'auto',
      data: { skill: this.skill }
    });
  }

  deleteSkill = () => {
    this.blockUI.start('Deleting....');
    const appIds: string[] = [].concat(this.skill._id);
    if (appIds && appIds.length > 0) {
      this.proceedDelete(appIds);
    } else {
      this.toastrService.error("Please select items to delete.", "Error");
      this.blockUI.stop();
    }
  }

  proceedDelete = (appIds: string[]) => {
    let form = new FormData();
    form.append("skillIds", JSON.stringify(appIds));

    this.skillSubscriptions.push(this.skillAssessmentService.deleteSkill(form).subscribe((deletedResult: any) => {
      if (deletedResult) {
        this.skillAssessmentService.afterDelete.emit({ deleted: true, skillIds: appIds });
        this.toastrService.success('Successfully deleted.', 'Success');
      }
      this.blockUI.stop();
    }, () => {
      this.toastrService.error('Failed to delete', 'Error');
      this.blockUI.stop();
    }));
  }

  ngOnDestroy() {
    if (this.skillSubscriptions && this.skillSubscriptions.length > 0) {
      this.skillSubscriptions.forEach(s => {
        s.unsubscribe();
      })
    }
  }
}
