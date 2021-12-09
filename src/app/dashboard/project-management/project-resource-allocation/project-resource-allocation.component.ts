import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectManagementService, AuthService } from '../../../shared/services';

@Component({
  selector: 'app-project-resource-allocation',
  templateUrl: './project-resource-allocation.component.html',
  styleUrls: ['./project-resource-allocation.component.scss']
})
export class ProjectResourceAllocationComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  projects: any = [];

  constructor(
    public matDialogRef: MatDialogRef<ProjectResourceAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectManagementService: ProjectManagementService,
    private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.blockUI.start('Fetching .....');
    this.authService.fetchUsers().subscribe(serviceRes => {
      if (serviceRes) {
        const project = this.data?.project;
        this.projects = serviceRes.result;
        // user -> assigned-projects -> selected-project-id
        debugger
      }
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      console.log(error);
    })
    // this.projectManagementService.getAssignedProjects().subscribe(projects => {
    //   if (projects) {
    //     const project = this.data?.project;
    //     this.projects = projects.result;
    //     debugger
    //   }
    //   this.blockUI.stop();
    // }, error => {
    //   this.blockUI.stop();
    //   console.log(error);
    // })
  }

}
