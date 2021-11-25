import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProjectManagementService, AuthService } from '../../../../shared/services';

@Component({
  selector: 'app-assign-project-dialog',
  templateUrl: './assign-project-dialog.component.html',
  styleUrls: ['./assign-project-dialog.component.scss']
})
export class AssignProjectDialogComponent implements OnInit {

  @Output() afterSave: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterUpdate: EventEmitter<any> = new EventEmitter<any>();

  @BlockUI() blockUI!: NgBlockUI;

  projectDetails: any[] = [];
  assignedProjectFormGroup!: FormGroup;
  selectedUser: any;
  existingAssignedProject: any;
  isUpdate: boolean = false;
  allocatedProjects: any[] = [];
  users: any[] = [];


  designations: any[] = [
    { key: 'ASE', viewValue: 'Associate Software Engineer' },
    { key: 'SE', viewValue: 'Software Engineer' },
    { key: 'SSE', viewValue: 'Senior Software Engineer' },
    { key: 'ATL', viewValue: 'Associate Technical Lead' },
    { key: 'TL', viewValue: 'Technical Lead' },
    { key: 'AT', viewValue: 'Architecht' },
    { key: 'PM', viewValue: 'Project Manager' },
    { key: 'CEO', viewValue: 'CEO' },
    { key: 'SC', viewValue: 'Software Consultant' },
    { key: 'AA', viewValue: 'Associate Architect' },
    { key: 'STL', viewValue: 'Senior Technical Lead' },
    { key: 'APM', viewValue: 'Associate Project Manager' },
    { key: 'APM', viewValue: 'Associate Project Manager' },
    { key: 'AQL', viewValue: 'Associate QA Lead' },
    { key: 'AQM', viewValue: 'Associate QA Manager' },
    { key: 'AUL', viewValue: 'Associate UI Lead' },
    { key: 'SQAL', viewValue: 'Senior Quality Assurance Lead' },
    { key: 'SQA', viewValue: 'Senior Quality Assurance Engineer' },
    { key: 'UL', viewValue: 'UI Lead' },
    { key: 'UE', viewValue: 'UI Engineer' },
    { key: 'QE', viewValue: 'QA Engineer' },
    { key: 'UXE', viewValue: 'UX Engineer' },
    { key: 'BA', viewValue: 'Business Analyst' },
    { key: 'AUXL', viewValue: 'Associate UX Lead' },
    { key: 'ADSE', viewValue: 'Associate Data Science Engineer' },
    { key: 'HPM', viewValue: 'Head of Project Management' },
    { key: 'DMS', viewValue: 'Degital Marketing Specialist' },
    { key: 'EAHR', viewValue: 'Executive - Admin & HR' },
    { key: 'NSA', viewValue: 'Network & Systems Administrator' },
    { key: 'SEFA', viewValue: 'Senior Executive - Finance and Administration' },
  ];

  constructor(
    private projectManagementService: ProjectManagementService,
    private authService: AuthService,
    public matDialogRef: MatDialogRef<AssignProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.initilizeFormGroup();
    this.setDialogData();
    this.fetchUsers();
    this.fetchProjects();
  }

  initilizeFormGroup = () => {
    this.assignedProjectFormGroup = new FormGroup({
      resource: new FormControl(null, Validators.required),
      allocationHours: new FormControl(null, Validators.required),
      project: new FormControl(null, Validators.required),
      fromDate: new FormControl(null, Validators.required),
      toDate: new FormControl(null, Validators.required),
      comments: new FormControl(null)
    })
  }

  onResourceChange = () => {
    this.selectedUser = this.assignedProjectFormGroup.get('resource')?.value;
  }

  fetchUsers = () => {
    this.authService.fetchUsers().subscribe(userResult => {
      if (userResult) {
        this.users = userResult.result;
      }
    }, error => {
      console.log(error);
      this.blockUI.stop();
    })
  }

  fetchProjects = () => {
    this.blockUI.start('Fetching ......');
    this.projectManagementService.getAllProjects().subscribe(projectData => {
      if (projectData && projectData.validity) {
        const data = projectData?.result;
        this.projectDetails = data;
        // this.setAllocatedProject(data);
        // const existingProject = this.data?.assignedProject;
        // this.patchForm(existingProject);
      }
      this.blockUI.stop();
    }, error => {
      console.log(error);
      this.blockUI.stop();
    })
  }

  getDesignation = () => {
    if (this.selectedUser) {
      const designation = this.designations.find(x => x.key === this.selectedUser.designation);
      return designation?.viewValue;
    }
    return "";
  }

  // setAllocatedProject = (projectData: any) => {
  //   if (this.existingAssignedProject) {
  //     this.projectDetails = projectData;
  //   } else if (this.selectedUser?.assignedProjects) {
  //     this.projectDetails = projectData;
  //     //TODO: CHECK ON THIS LATER.
  //     // const assignedProjects = this.selectedUser?.assignedProjects.map((x: any) => x.project);
  //     // this.projectDetails = projectData?.filter(function (leftElement: any) {
  //     //   return assignedProjects?.filter(function (rightElement: any) {
  //     //     return rightElement.projectId == leftElement.projectId;
  //     //   }).length == 0
  //     // });
  //   }
  // }

  setDialogData = () => {
    this.selectedUser = this.data?.user;
    this.existingAssignedProject = this.data?.assignedProject;
  }

  patchForm = (data: any) => {
    if (data) {
      this.isUpdate = true;
      const patchPayload = {
        project: this.projectDetails.find(x => x._id === data?.project._id),
        userId: data?.userId,
        comments: data?.comments,
        fromDate: data.fromDate,
        toDate: data.toDate,
        allocationHours: data.allocationHours
      }
      this.assignedProjectFormGroup.patchValue(patchPayload);
    }
  }

  onProjectAssign = () => {
    this.blockUI.start('Processing .......');
    if (this.assignedProjectFormGroup.valid) {

      if (this.checkAlreadyProjectAssigned()) {
        this.toastrService.error("Selected project already being assigned for this user.", "Error");
        this.blockUI.stop();
      } else if (this.existingAssignedProject) {
        this.existingAssignedProject.project = (this.assignedProjectFormGroup.get('project')?.value)._id;
        this.existingAssignedProject.userId = this.selectedUser?.userId;
        this.existingAssignedProject.comments = this.assignedProjectFormGroup.get('comments')?.value;
        this.existingAssignedProject.allocationHours = this.assignedProjectFormGroup.get('allocationHours')?.value;
        this.existingAssignedProject.fromDate = this.assignedProjectFormGroup.get('fromDate')?.value;
        this.existingAssignedProject.toDate = this.assignedProjectFormGroup.get('toDate')?.value;

        this.projectManagementService.updateAssignedProject(this.existingAssignedProject).subscribe(udpatedResult => {
          if (udpatedResult) {
            this.existingAssignedProject['project'] = this.assignedProjectFormGroup.get('project')?.value;
            this.afterUpdate.emit(this.existingAssignedProject);
            this.toastrService.success('Successfully updated.', "Update");
            this.onClear();
          }
          this.blockUI.stop();
        }, () => {
          this.blockUI.stop();
        })
      } else {
        const payload = {
          project: (this.assignedProjectFormGroup.get('project')?.value)._id,
          userId: this.selectedUser?.userId,
          fromDate: this.assignedProjectFormGroup.get('fromDate')?.value,
          toDate: this.assignedProjectFormGroup.get('toDate')?.value,
          comments: this.assignedProjectFormGroup.get('comments')?.value,
          allocationHours: this.assignedProjectFormGroup.get('allocationHours')?.value
        }

        this.projectManagementService.assignProject(payload).subscribe(assignedResult => {
          if (assignedResult) {
            assignedResult['project'] = this.assignedProjectFormGroup.get('project')?.value;
            this.afterSave.emit(assignedResult);
            // const assignedProject = assignedResult?.result?.assignmentDetail
            // this.selectedUser['assignedProjects']?.length > 0 ?
            //   this.selectedUser['assignedProjects'].push(assignedProject) :
            //   this.selectedUser['assignedProjects'] = [assignedProject];
            this.toastrService.success('Successfully saved.', "Success");
            this.onClear();
          }
          this.blockUI.stop();
        }, () => {
          this.blockUI.stop();
        })
      }
    } else {
      this.toastrService.error('Please check the form again', 'Error');
      this.blockUI.stop();
    }
  }

  onAllocationChange = () => {
    const currentAllocation = this.selectedUser.assignedProjects.map((x: any) => x.allocationHours).reduce((a: number, b: number) => a + b, 0)
    if (currentAllocation > 8) {
      this.toastrService.warning(`This user already assigned ${currentAllocation}`);
    }

    const allocationHours = this.assignedProjectFormGroup.get('allocationHours')?.value;
    if (allocationHours > 8) {
      this.toastrService.warning(`The allocation is over exceeded ${allocationHours}`);
    }
  }


  checkAlreadyProjectAssigned = (): boolean => {
    if (!this.isUpdate) {
      const assignedProjects = this.selectedUser?.assignedProjects.map((x: any) => x.project);
      const project = this.assignedProjectFormGroup?.get('project')?.value;
      return assignedProjects.some((x: any) => x.projectId === project.projectId);
    }
    return false;
  }

  onClear = () => {
    this.assignedProjectFormGroup.reset({});
  }

  onEdit = (event: any) => {
    this.existingAssignedProject = event;
    this.patchForm(event);
  }

  afterDeletion = (event: any) => {
    this.existingAssignedProject = event;
    this.onClear();
  }

  closeModal = () => {
    this.matDialogRef.close();
  }

}
