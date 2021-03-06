import { Component, OnInit, Inject, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit, OnDestroy {
  @Input() user!: any;
  userForm!: FormGroup;

  sampleCover = "A highly versatile, passionate and driven Talent / HR Manager, Recruitment Specialist and HR generalist with 13 years’ experience working in high volume teams across Education, Aged Care, Insurance, Customer Service, Retail, Health and IT industries. A finalist in the Bupa Global People Leader of the year awards I am known for creating a collaborative,"

  userSubscriptions: Subscription[] = [];
  uploadedImage: any = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVamKPfw0_YElX1zi2NykJl0Ee3zc2wi22fA&usqp=CAU";
  uploadImageFileFormat: any;

  projectStatus: any[] = [
    { value: 'active', viewValue: 'active' },
    { value: 'in-active', viewValue: 'in-active' },
    { value: 'done', viewValue: 'Done' }
  ];

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
    public matDialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastrService: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
    if (this.data) {
      this.user = this.data.user;
      this.uploadedImage = this.user?.profilePic ? this.user?.profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVamKPfw0_YElX1zi2NykJl0Ee3zc2wi22fA&usqp=CAU";

      this.patchUserForm();
    } else {
      this.userForm.get('password')?.setValidators(Validators.required);
    }
  }

  initializeForm = () => {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      middleName: new FormControl(null),
      userEmail: new FormControl(null, Validators.required),
      password: new FormControl(null),
      contact: new FormControl(null, Validators.required),
      userAddress: new FormControl(null),
      nic: new FormControl(null),
      passportId: new FormControl(null),
      roles: new FormControl(null),
      profilePic: new FormControl(null),
      skills: new FormControl(null),
      projectType: new FormControl(null),
      designation: new FormControl(null, Validators.required)
    })
  }

  patchUserForm = () => {
    this.userForm.patchValue(this.user);
  }

  closeModal = () => {
    this.matDialogRef.close();
  }

  saveUser = () => {
    Object.keys(this.userForm.controls).forEach(e => {
      const control = this.userForm.get(e);
      control?.markAsTouched();
      control?.updateValueAndValidity({ onlySelf: true });
    });

    if (this.userForm.valid) {
      const user = this.userForm.getRawValue();

      if (this.user) {
        this.user.userName = user.userName;
        this.user.firstName = user.firstName;
        this.user.lastName = user.lastName;
        this.user.middleName = user.middleName;
        this.user.userEmail = user.userEmail;
        this.user.contact = user.contact;
        this.user.userAddress = user.userAddress;
        this.user.nic = user.nic;
        this.user.passportId = user.passportId;
        this.user.roles = user.roles;
        this.user.profilePic = this.uploadedImage;
        this.user.projectType = user.projectType;
        this.user.designation = user.designation;
        // add the service call from here
        this.userSubscriptions.push(this.authService.updateUser(this.user).subscribe(serviceResult => {
          if (serviceResult) {
            const referrence = { isEditMode: true, user: this.user };
            this.toastrService.success('Successfully updated.', 'Success');
            this.authService.onUserAfterSave.emit(referrence);
            this.closeModal();
          }
        }, error => {
          console.log(error);
        }));
      } else {

        // user['profilePic'] = this.uploadedImage;
        let userForm = new FormData();
        userForm.append("profileImage", this.uploadedImage);
        userForm.append("userPayload", JSON.stringify(user));


        this.userSubscriptions.push(this.authService.saveUser(userForm).subscribe(serviceResult => {
          if (serviceResult) {
            this.toastrService.success('Successfully saved.', 'Success');
            this.authService.onUserAfterSave.emit(user);
            this.closeModal();
          }
        }, error => {
          console.log(error);
        }))
      }
    } else {
      this.toastrService.error('Please check the form again.', 'Error');
    }
  }

  onFileSelected = (event: any) => {
    let file = event.target.files[0];
    this.uploadImageFileFormat = file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
  }

  ngOnDestroy() {
    if (this.userSubscriptions && this.userSubscriptions.length > 0) {
      this.userSubscriptions.forEach(e => {
        e.unsubscribe();
      })
    }
  }
}
