"use strict";(self.webpackChunkproject_management_client=self.webpackChunkproject_management_client||[]).push([[497],{27497:(B,Z,o)=>{o.r(Z),o.d(Z,{PermissionManagementModule:()=>j});var g=o(38583),A=o(25239),l=o(3679),T=o(81693),b=o(93738),y=o(1769),w=o(33935),N=o(12522),u=o(76627),F=o(7539),U=o(4929),I=o(38590),h=o(51095),M=o(94935),R=o(77746),d=o(22238),f=o(98295),S=o(49983),x=o(67441),P=o(8307),e=o(37716),D=o(49344),v=o(15328);function J(s,t){1&s&&(e.TgZ(0,"mat-error"),e._uU(1,"This field is required "),e.qZA())}function O(s,t){1&s&&(e.TgZ(0,"mat-error"),e._uU(1,"This field is required "),e.qZA())}let C=(()=>{class s{constructor(n,r,i,m){this.matDialogRef=n,this.data=r,this.toastrService=i,this.authService=m,this.permissionSubscription=[],this.initializeForm=()=>{this.permissionForm=new l.cw({permissionName:new l.NI(null,l.kI.required),permissionCode:new l.NI(null,l.kI.required),permissionDescription:new l.NI(null)})},this.patchForm=()=>{this.permissionForm.patchValue(this.permission)},this.closeModal=()=>{this.matDialogRef.close()},this.saveUser=()=>{if(Object.keys(this.permissionForm.controls).forEach(p=>{const a=this.permissionForm.get(p);null==a||a.markAsTouched(),null==a||a.updateValueAndValidity({onlySelf:!0})}),this.permissionForm.valid){const p=this.permissionForm.value;this.permission?(this.permission.permissionName=p.permissionName,this.permission.permissionCode=p.permissionCode,this.permission.permissionDescripotion=p.permissionDescripotion,this.permissionSubscription.push(this.authService.updateUserPermission(this.permission).subscribe(a=>{if(a){const L={isEditMode:!0,permission:this.permission};this.toastrService.success("Successfully updated.","Success"),this.authService.onPermissionAfterSave.emit(L),this.closeModal()}},a=>{console.log(a)}))):this.permissionSubscription.push(this.authService.saveUserPermission(p).subscribe(a=>{a&&(this.toastrService.success("Successfully saved.","Success"),this.authService.onPermissionAfterSave.emit(a.result),this.closeModal())},a=>{console.log(a)}))}else this.toastrService.error("Please check the form again.","Error")}}ngOnInit(){this.initializeForm(),this.data&&(this.permission=this.data.permission,this.patchForm())}}return s.\u0275fac=function(n){return new(n||s)(e.Y36(d.so),e.Y36(d.WI),e.Y36(D._W),e.Y36(v.Tq))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-create-permission"]],inputs:{permission:"permission"},decls:26,vars:5,consts:[[1,"flex","justify-between","items-center"],["mat-icon-button","",3,"click"],[1,"overflow-auto","pt-4",3,"formGroup"],[1,"flex"],["appearance","outline",1,"flex-1"],["matInput","","placeholder","Permission Name","formControlName","permissionName"],[4,"ngIf"],["appearance","outline",1,"flex-1","pl-6"],["matInput","","placeholder","Permission Code","formControlName","permissionCode"],["matInput","","placeholder","Permission Description","formControlName","permissionDescription"],[1,"flex","justify-end"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,r){if(1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"h2"),e._uU(2),e.qZA(),e.TgZ(3,"button",1),e.NdJ("click",function(){return r.closeModal()}),e.TgZ(4,"mat-icon"),e._uU(5,"close"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"div",2),e.TgZ(7,"div",3),e.TgZ(8,"mat-form-field",4),e.TgZ(9,"mat-label"),e._uU(10,"Permission Name"),e.qZA(),e._UZ(11,"input",5),e.YNc(12,J,2,0,"mat-error",6),e.qZA(),e.TgZ(13,"mat-form-field",7),e.TgZ(14,"mat-label"),e._uU(15,"Permission Code"),e.qZA(),e._UZ(16,"input",8),e.YNc(17,O,2,0,"mat-error",6),e.qZA(),e.qZA(),e.TgZ(18,"div",3),e.TgZ(19,"mat-form-field",4),e.TgZ(20,"mat-label"),e._uU(21,"Permission Description"),e.qZA(),e._UZ(22,"textarea",9),e.qZA(),e.qZA(),e.qZA(),e.TgZ(23,"div",10),e.TgZ(24,"button",11),e.NdJ("click",function(){return r.saveUser()}),e._uU(25),e.qZA(),e.qZA()),2&n){let i,m;e.xp6(2),e.hij("",r.permission?"Update":"Create"," Role"),e.xp6(4),e.Q6J("formGroup",r.permissionForm),e.xp6(6),e.Q6J("ngIf",null==r.permissionForm||null==(i=r.permissionForm.get("permissionName"))?null:i.hasError("required")),e.xp6(5),e.Q6J("ngIf",null==r.permissionForm||null==(m=r.permissionForm.get("permissionCode"))?null:m.hasError("required")),e.xp6(8),e.Oqu(r.permission?"Update":"Save")}},directives:[h.lW,u.Hw,l.JL,l.sg,f.KE,f.hX,S.Nt,l.Fj,l.JJ,l.u,g.O5,f.TO],styles:[""]}),s})();var q=o(64762),z=o(44741);class c{constructor(t,n,r){this.dialog=t,this.authService=n,this.toastrService=r,this.permSubscriptions=[],this.openModal=()=>{this.dialog.open(C,{width:"50%",height:"auto",data:{permission:this.data}})},this.deletePermission=()=>{this.blockUI.start("Deleting....");const i=[].concat(this.data._id);i&&i.length>0?this.proceedDelete(i):(this.toastrService.error("Please select items to delete.","Error"),this.blockUI.stop())},this.proceedDelete=i=>{let m=new FormData;m.append("permissionIds",JSON.stringify(i)),this.permSubscriptions.push(this.authService.deleteUserPermission(m).subscribe(p=>{p&&(this.authService.onPermissionAfterDelete.emit({deleted:!0,permissionIds:i}),this.toastrService.success("Successfully deleted.","Success")),this.blockUI.stop()},()=>{this.toastrService.error("Failed to delete","Error"),this.blockUI.stop()}))}}ngOnInit(){}agInit(t){t&&t.data&&(this.data=t.data)}refresh(t){this.data=this.getValueToDisplay(t)}getValueToDisplay(t){return t.valueFormatted?t.valueFormatted:t.value}ngOnDestroy(){this.permSubscriptions&&this.permSubscriptions.length>0&&this.permSubscriptions.forEach(t=>{t.unsubscribe()})}}c.\u0275fac=function(t){return new(t||c)(e.Y36(d.uw),e.Y36(v.Tq),e.Y36(D._W))},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-permission-cell-renderer"]],decls:7,vars:0,consts:[[1,"flex"],["mat-icon-button","",3,"click"],["mat-icon-button","",1,"pl-2",3,"click"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0),e.TgZ(1,"button",1),e.NdJ("click",function(){return n.openModal()}),e.TgZ(2,"mat-icon"),e._uU(3,"edit"),e.qZA(),e.qZA(),e.TgZ(4,"button",2),e.NdJ("click",function(){return n.deletePermission()}),e.TgZ(5,"mat-icon"),e._uU(6,"delete"),e.qZA(),e.qZA(),e.qZA())},directives:[h.lW,u.Hw],styles:[""]}),(0,q.gn)([(0,z.bH)()],c.prototype,"blockUI",void 0);const V=[{path:"",redirectTo:"view-permissions",pathMatch:"full"},{path:"view-permissions",component:(()=>{class s{constructor(n,r){this.dialog=n,this.authService=r,this.rowData=[],this.permissionSubscriptions=[],this.loadAllPermissions=()=>{this.permissionSubscriptions.push(this.authService.fetchUserPermission().subscribe(i=>{i&&i.result&&(this.rowData=i.result)},i=>{console.log(i)}))},this.permissionCreateListener=()=>{this.permissionSubscriptions.push(this.authService.onPermissionAfterSave.subscribe(i=>{if(i)if(i&&i.isEditMode){const m=this.rowData.findIndex(p=>p._id===i.permission._id);this.rowData[m]=i.user,this.gridApi.setRowData(this.rowData)}else this.rowData.unshift(i),this.gridApi.setRowData(this.rowData)}))},this.permissionDeleteListener=()=>{this.permissionSubscriptions.push(this.authService.onPermissionAfterDelete.subscribe(i=>{if(i){const m=i.permissionIds[0],p=this.rowData.findIndex(a=>a._id===m);this.rowData.splice(p,1),this.gridApi.setRowData(this.rowData)}}))},this.openModal=()=>{this.dialog.open(C,{width:"60%",height:"auto",data:null})},this.sizeToFit=()=>{this.gridApi.sizeColumnsToFit()},this.onGridReady=i=>{this.gridApi=i.api,this.gridColumnApi=i.columnApi,this.sizeToFit()},this.ngOnDestroy=()=>{this.permissionSubscriptions&&this.permissionSubscriptions.length>0&&this.permissionSubscriptions.forEach(i=>{i.unsubscribe()})},this.columnDefs=[{field:"permissionName",headerName:"permission Name",suppressAutoSize:!0,width:150},{field:"permissionCode",headerName:"permission Code",suppressAutoSize:!0,width:150},{field:"permissionDescription",headerName:"permission Description",suppressAutoSize:!0,width:150},{field:"createdBy",headerName:"Create By",width:120,suppressAutoSize:!0},{field:"createdOn",headerName:"Created On",width:120,suppressAutoSize:!0},{headerName:"Actions",width:100,cellRendererFramework:c}],this.defaultColDef={resizable:!0}}ngOnInit(){this.loadAllPermissions(),this.permissionCreateListener(),this.permissionDeleteListener()}}return s.\u0275fac=function(n){return new(n||s)(e.Y36(d.uw),e.Y36(v.Tq))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-view-permissions"]],decls:13,vars:3,consts:[[1,"flex"],[1,"flex","justify-between","w-full"],[1,"text-3xl","uppercase"],["mat-raised-button","",3,"click"],[1,"text-xl"],[1,"outer-div","pt-8"],[1,"grid-wrapper","w-full"],["id","myGrid",1,"ag-theme-material",2,"width","100%","height","100%",3,"columnDefs","defaultColDef","rowData","gridReady"],["agGrid",""]],template:function(n,r){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"span",2),e._uU(3,"User Management"),e.qZA(),e.TgZ(4,"button",3),e.NdJ("click",function(){return r.openModal()}),e.TgZ(5,"mat-icon"),e._uU(6,"add"),e.qZA(),e.TgZ(7,"span",4),e._uU(8,"Add Role"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(9,"div",5),e.TgZ(10,"div",6),e.TgZ(11,"ag-grid-angular",7,8),e.NdJ("gridReady",function(m){return r.onGridReady(m)}),e.qZA(),e.qZA(),e.qZA()),2&n&&(e.xp6(11),e.Q6J("columnDefs",r.columnDefs)("defaultColDef",r.defaultColDef)("rowData",r.rowData))},directives:[h.lW,u.Hw,A.N8],styles:[".outer-div[_ngcontent-%COMP%]{height:80%;display:flex;flex-direction:column}.button-bar[_ngcontent-%COMP%]{margin-bottom:1rem}.grid-wrapper[_ngcontent-%COMP%]{flex:1 1 auto}"]}),s})()},{path:"create",component:C},{path:"**",redirectTo:"view-permissions"}];let E=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[[g.ez,P.Bz.forChild(V)],P.Bz]}),s})();const Y={suppressScrollX:!0};let j=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({providers:[{provide:T.op,useValue:Y}],imports:[[g.ez,E,l.u5,l.UX,A.sF.withComponents([c]),b.QW,y.t,w.Tx,N.g0,u.Ps,F.p9,U.N6,I.AV,h.ot,M.SJ,R.ie,d.Is,f.lN,S.c,x.LD,T.Xd]]}),s})()}}]);