import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialog } from '@angular/material/dialog';
import { ColDef, GridApi, GridOptions } from "ag-grid-community";
import { AuthService, ProjectManagementService } from '../../../shared/services';
import { AssignProjectDialogComponent } from './assign-project-dialog/assign-project-dialog.component';
import { ProjectCodeComponent } from './cell-renderers/project-code/project-code.component';
import { ProjectAllocationComponent } from './cell-renderers/project-allocation/project-allocation.component';
import { ProjectNameComponent } from './cell-renderers/project-name/project-name.component';
import { AssignProjectActionComponent } from './cell-renderers/assign-project-action/assign-project-action.component';
import { AssignedProjectsReportComponent } from './assigned-projects-report/assigned-projects-report.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssignProjectComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI!: NgBlockUI;
  displayedColumns: string[] = ['index', 'empty', 'name', 'designation', 'allocated-hours', 'fts', 'action'];
  dataSource: any = new MatTableDataSource<any>();

  skillColumns: string[] = ['project', 'rate-card', 'status', 'allocated-hours', 'action',];

  projectDetails: any[] = [];

  gridApi!: GridApi;
  gridColumnApi: any;

  columnDefs!: ColDef[];
  defaultColDef!: ColDef;
  rowData: any[] = [];
  gridOption!: GridOptions;
  users: any[] = [];
  selectedUser: any;
  subscriptions: Subscription[] = [];

  constructor(
    private matDialog: MatDialog,
    private authService: AuthService,
    private projectManagementService: ProjectManagementService,
    private toastrService: ToastrService,
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
        field: 'fromDate',
        width: 120,
      },
      {
        headerName: 'To Date',
        suppressAutoSize: true,
        field: 'toDate',
        width: 120,
      },
      {
        headerName: 'Comments',
        field: 'comments',
        suppressAutoSize: true,
        width: 120,
      },
      {
        headerName: 'Actions',
        width: 100,
        cellRendererFramework: AssignProjectActionComponent
      }
    ];
    this.defaultColDef = { resizable: true };
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.assignedSkillDeletion();
  }

  fetchUsers = () => {
    this.authService.fetchUsers().subscribe(userResult => {
      if (userResult) {
        this.users = userResult.result;
        const dataSet = this.users.filter(x => x.assignedProjects && x.assignedProjects.length > 0);
        dataSet.forEach((u: any, index: number) => {
          u['index'] = index + 1;
          u['expanded'] = false;
        })
        this.dataSource = dataSet;
      }
    }, error => {
      console.log(error);
      this.blockUI.stop();
    })
  }

  assignedSkillDeletion = () => {
    this.subscriptions.push(this.projectManagementService.afterAssignedProjectDelete.subscribe(res => {
      if (res) {
        const assignedProjects = this.selectedUser.assignedProjects.filter((s: any) => s?._id !== res?.deletedId[0]);
        this.selectedUser.assignedProjects = [...assignedProjects];
        this.rowData = this.selectedUser.assignedProjects;
        this.gridApi.setRowData(this.rowData);
      }
    }))
  }

  onGridReady = (params: any) => {
    this.gridApi = params?.api;
    this.gridColumnApi = params?.columnApi;
    this.sizeToFit();
  }

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  }

  onResourceSelection = () => {
    this.rowData = this.selectedUser?.assignedProjects;
    this.projectManagementService.userInformation = this.selectedUser;
  }

  openProjectAssignment = () => {
    const projectAssignDialog = this.matDialog.open(AssignProjectDialogComponent, {
      width: '80%',
      height: 'auto',
    });

    this.subscriptions.push(
      projectAssignDialog.componentInstance.afterSave.subscribe((res: any) => {
        // const assignmentDetail = res?.result?.assignmentDetail;
        // assignmentDetail.project = res?.project;
        this.fetchUsers();
        // this.rowData.push(assignmentDetail);
        // this.gridApi.setRowData(this.rowData);
      })
    )
  }

  openProjectAssignmentReport = (user: any) => {
    this.matDialog.open(AssignedProjectsReportComponent, {
      width: '60%',
      height: 'auto',
      data: { user: user }
    });
  }

  subGroupsAvailable = (index: any, item: any): boolean => {
    return item?.assignedProjects?.length > 0;
  }

  totalAllocatedHours = (assignedProjects: any[]) => {
    return assignedProjects.map(x => x.allocationHours).reduce((a: number, b: number) => a + b, 0);
  }

  getTotalFts = (user: any): number => {
    if (user && user?.assignedProjects) {
      const totalHours = user?.assignedProjects.map((x: any) => x.allocationHours).reduce((a: number, b: number) => a + b, 0);
      return (totalHours / 8) as number;
    }
    return 0;
  }

  deleteHandler = (assignedProject: any) => {
    this.blockUI.start('Deleting....');
    const appIds: string[] = [].concat(assignedProject?._id);
    if (appIds && appIds.length > 0) {
      this.proceedDelete(assignedProject, appIds);
    } else {
      this.toastrService.error("Please select items to delete.", "Error");
      this.blockUI.stop();
    }
  }

  proceedDelete = (project: any, projectIds: string[]) => {
    let form = new FormData();
    form.append("assignedProjectIds", JSON.stringify(projectIds));
    form.append("userId", JSON.stringify(project?.userId));

    this.projectManagementService.deleteAssignedProjects(form).subscribe((deletedResult: any) => {
      if (deletedResult) {
        this.toastrService.success('Successfully deleted.', 'Success');
        this.fetchUsers();
      }
      this.blockUI.stop();
    }, () => {
      this.toastrService.error('Failed to delete', 'Error');
      this.blockUI.stop();
    });
  }

  ngOnDestroy() {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(s => {
        s.unsubscribe();
      })
    }
  }

}
