import { Component, OnInit, Inject } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectManagementService, AuthService } from '../../../shared/services';

@Component({
  selector: 'app-project-resource-allocation',
  templateUrl: './project-resource-allocation.component.html',
  styleUrls: ['./project-resource-allocation.component.scss']
})
export class ProjectResourceAllocationComponent implements OnInit {

  @BlockUI() blockUI!: NgBlockUI;
  displayedColumns: string[] = ['first-name', 'last-name', 'designation'];
  dataSource: any = new MatTableDataSource<any>();

  constructor(
    public matDialogRef: MatDialogRef<ProjectResourceAllocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectManagementService: ProjectManagementService,
    private authService: AuthService,
    private toastrService: ToastrService) {
    this.matDialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.blockUI.start('Fetching .....');
    this.authService.fetchUsers().subscribe(serviceRes => {
      if (serviceRes) {
        const project = this.data?.project;
        const assignedUsers = serviceRes.result.filter((x: any) => x.assignedProjects && x.assignedProjects.length > 0);
        this.dataSource.data = assignedUsers.filter((u: any) => {
          return u.assignedProjects.filter((ap: any) => ap.project._id === project._id)
        })
      }
      this.blockUI.stop();
    }, error => {
      this.blockUI.stop();
      console.log(error);
    });
  }

  closeModal = () => { 
    this.matDialogRef.close();
  }

}
