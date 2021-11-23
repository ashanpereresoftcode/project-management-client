"use strict";(self.webpackChunkproject_management_client=self.webpackChunkproject_management_client||[]).push([[409],{25409:(k,S,r)=>{r.r(S),r.d(S,{RoleManagementModule:()=>W});var R=r(38583),T=r(25239),a=r(3679),D=r(81693),w=r(93738),F=r(1769),I=r(33935),M=r(12522),f=r(76627),U=r(7539),x=r(4929),O=r(38590),g=r(51095),J=r(94935),q=r(77746),p=r(22238),v=r(98295),b=r(49983),z=r(67441),y=r(8307),e=r(37716),N=r(49344),C=r(15328);function E(o,i){1&o&&(e.TgZ(0,"mat-error"),e._uU(1,"This field is required"),e.qZA())}function V(o,i){1&o&&(e.TgZ(0,"mat-error"),e._uU(1,"This field is required"),e.qZA())}let Z=(()=>{class o{constructor(l,s,t,c){this.matDialogRef=l,this.data=s,this.toastrService=t,this.authService=c,this.roleSubscriptions=[],this.initializeForm=()=>{this.roleForm=new a.cw({roleName:new a.NI(null,a.kI.required),roleCode:new a.NI(null,a.kI.required),roleDescription:new a.NI(null)})},this.patchForm=()=>{this.roleForm.patchValue(this.role)},this.closeModal=()=>{this.matDialogRef.close()},this.saveUser=()=>{var u,h,A;if(Object.keys(this.roleForm.controls).forEach(d=>{const n=this.roleForm.get(d);null==n||n.markAsTouched(),null==n||n.updateValueAndValidity({onlySelf:!0})}),this.roleForm.valid){let d={};d.roleCode=null===(u=this.roleForm.get("roleCode"))||void 0===u?void 0:u.value,d.roleName=null===(h=this.roleForm.get("roleName"))||void 0===h?void 0:h.value,d.roleDescription=null===(A=this.roleForm.get("roleDescription"))||void 0===A?void 0:A.value,d.permissions=[],this.role?(this.role.roleName=d.roleName,this.role.roleCode=d.roleCode,this.role.roleDescription=d.roleDescription,this.roleSubscriptions.push(this.authService.updateRole(this.role).subscribe(n=>{if(n){const X={isEditMode:!0,role:this.role};this.toastrService.success("Successfully updated.","Success"),this.authService.onRoleAfterSave.emit(X),this.closeModal()}},n=>{console.log(n)}))):this.roleSubscriptions.push(this.authService.addRole(d).subscribe(n=>{n&&n.validity&&(this.toastrService.success("Successfully saved.","Success"),this.authService.onRoleAfterSave.emit(n.result),this.closeModal())},n=>{console.log(n)}))}else this.toastrService.error("Please check the form again.","Error")}}ngOnInit(){this.initializeForm(),this.data&&(this.role=this.data.role,this.patchForm())}ngOnDestroy(){this.roleSubscriptions&&this.roleSubscriptions.length>0&&this.roleSubscriptions.forEach(l=>{l.unsubscribe()})}}return o.\u0275fac=function(l){return new(l||o)(e.Y36(p.so),e.Y36(p.WI),e.Y36(N._W),e.Y36(C.Tq))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-create-role"]],inputs:{role:"role"},decls:26,vars:4,consts:[[1,"flex","justify-between","items-center"],["mat-icon-button","",3,"click"],[1,"overflow-auto","pt-4",3,"formGroup"],[1,"flex"],["appearance","outline",1,"flex-1"],["matInput","","placeholder","Role Name","formControlName","roleName"],[4,"ngIf"],["appearance","outline",1,"flex-1","pl-6"],["matInput","","placeholder","Role Code","formControlName","roleCode"],["matInput","","placeholder","Role Description","formControlName","roleDescription"],[1,"flex","justify-end"],["mat-raised-button","","color","primary",3,"click"]],template:function(l,s){if(1&l&&(e.TgZ(0,"div",0),e.TgZ(1,"h2"),e._uU(2,"Create Role"),e.qZA(),e.TgZ(3,"button",1),e.NdJ("click",function(){return s.closeModal()}),e.TgZ(4,"mat-icon"),e._uU(5,"close"),e.qZA(),e.qZA(),e.qZA(),e.TgZ(6,"div",2),e.TgZ(7,"div",3),e.TgZ(8,"mat-form-field",4),e.TgZ(9,"mat-label"),e._uU(10,"Role Name"),e.qZA(),e._UZ(11,"input",5),e.YNc(12,E,2,0,"mat-error",6),e.qZA(),e.TgZ(13,"mat-form-field",7),e.TgZ(14,"mat-label"),e._uU(15,"Role Code"),e.qZA(),e._UZ(16,"input",8),e.YNc(17,V,2,0,"mat-error",6),e.qZA(),e.qZA(),e.TgZ(18,"div",3),e.TgZ(19,"mat-form-field",4),e.TgZ(20,"mat-label"),e._uU(21,"Role Description"),e.qZA(),e._UZ(22,"textarea",9),e.qZA(),e.qZA(),e.qZA(),e.TgZ(23,"div",10),e.TgZ(24,"button",11),e.NdJ("click",function(){return s.saveUser()}),e._uU(25),e.qZA(),e.qZA()),2&l){let t,c;e.xp6(6),e.Q6J("formGroup",s.roleForm),e.xp6(6),e.Q6J("ngIf",null==s.roleForm||null==(t=s.roleForm.get("roleName"))?null:t.hasError("required")),e.xp6(5),e.Q6J("ngIf",null==s.roleForm||null==(c=s.roleForm.get("roleCode"))?null:c.hasError("required")),e.xp6(8),e.Oqu(s.role?"Update":"Save")}},directives:[g.lW,f.Hw,a.JL,a.sg,v.KE,v.hX,b.Nt,a.Fj,a.JJ,a.u,R.O5,v.TO],styles:["textarea[_ngcontent-%COMP%]{resize:none!important}"]}),o})();var j=r(64762),Y=r(44741);class m{constructor(i,l,s){this.dialog=i,this.authService=l,this.toastrService=s,this.projectSubscriptions=[],this.openModal=()=>{this.dialog.open(Z,{width:"50%",height:"auto",data:{role:this.data}})},this.deleteRole=()=>{this.blockUI.start("Deleting....");const t=[].concat(this.data._id);t&&t.length>0?this.proceedDelete(t):(this.toastrService.error("Please select items to delete.","Error"),this.blockUI.stop())},this.proceedDelete=t=>{let c=new FormData;c.append("roleIds",JSON.stringify(t)),this.projectSubscriptions.push(this.authService.deleteRoles(c).subscribe(u=>{u&&(this.authService.onRoleAfterDelete.emit({deleted:!0,roleIds:t}),this.toastrService.success("Successfully deleted.","Success")),this.blockUI.stop()},()=>{this.toastrService.error("Failed to delete","Error"),this.blockUI.stop()}))}}ngOnInit(){}agInit(i){i&&i.data&&(this.data=i.data)}refresh(i){this.data=this.getValueToDisplay(i)}getValueToDisplay(i){return i.valueFormatted?i.valueFormatted:i.value}ngOnDestroy(){this.projectSubscriptions&&this.projectSubscriptions.length>0&&this.projectSubscriptions.forEach(i=>{i.unsubscribe()})}}m.\u0275fac=function(i){return new(i||m)(e.Y36(p.uw),e.Y36(C.Tq),e.Y36(N._W))},m.\u0275cmp=e.Xpm({type:m,selectors:[["app-role-action-cell-renderer"]],decls:7,vars:0,consts:[[1,"flex"],["mat-icon-button","",3,"click"],["mat-icon-button","",1,"pl-2",3,"click"]],template:function(i,l){1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"button",1),e.NdJ("click",function(){return l.openModal()}),e.TgZ(2,"mat-icon"),e._uU(3,"edit"),e.qZA(),e.qZA(),e.TgZ(4,"button",2),e.NdJ("click",function(){return l.deleteRole()}),e.TgZ(5,"mat-icon"),e._uU(6,"delete"),e.qZA(),e.qZA(),e.qZA())},directives:[g.lW,f.Hw],styles:[""]}),(0,j.gn)([(0,Y.bH)()],m.prototype,"blockUI",void 0);const L=[{path:"",redirectTo:"view-roles",pathMatch:"full"},{path:"view-roles",component:(()=>{class o{constructor(l,s){this.dialog=l,this.authService=s,this.rowData=[],this.roleSubscriptions=[],this.loadAllRoles=()=>{this.roleSubscriptions.push(this.authService.fetchRoleList().subscribe(t=>{t&&t.validity&&(this.rowData=t.result)},t=>{console.log(t)}))},this.roleCreateListener=()=>{this.roleSubscriptions.push(this.authService.onRoleAfterSave.subscribe(t=>{if(t)if(t&&t.isEditMode){const c=this.rowData.findIndex(u=>u._id===t.role._id);this.rowData[c]=t.role,this.gridApi.setRowData(this.rowData)}else this.rowData.unshift(t),this.gridApi.setRowData(this.rowData)}))},this.roleDeleteListener=()=>{this.roleSubscriptions.push(this.authService.onRoleAfterDelete.subscribe(t=>{if(t&&t.deleted){const c=t.roleIds[0],u=this.rowData.findIndex(h=>h._id===c);this.rowData.splice(u,1),this.gridApi.setRowData(this.rowData)}}))},this.openModal=()=>{this.dialog.open(Z,{width:"60%",height:"auto",data:null})},this.sizeToFit=()=>{this.gridApi.sizeColumnsToFit()},this.onGridReady=t=>{this.gridApi=t.api,this.gridColumnApi=t.columnApi,this.sizeToFit()},this.ngOnDestroy=()=>{this.roleSubscriptions&&this.roleSubscriptions.length>0&&this.roleSubscriptions.forEach(t=>{t.unsubscribe()})},this.columnDefs=[{field:"roleName",headerName:"Role Name",suppressAutoSize:!0,width:150},{field:"roleCode",headerName:"Role Code",suppressAutoSize:!0,width:150},{field:"roleDescription",headerName:"Role Description",suppressAutoSize:!0,width:150},{field:"createdOn",headerName:"Created On",width:120,suppressAutoSize:!0},{headerName:"Actions",width:100,cellRendererFramework:m}],this.defaultColDef={resizable:!0}}ngOnInit(){this.loadAllRoles(),this.roleCreateListener(),this.roleDeleteListener()}}return o.\u0275fac=function(l){return new(l||o)(e.Y36(p.uw),e.Y36(C.Tq))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-view-roles"]],decls:13,vars:3,consts:[[1,"flex"],[1,"flex","justify-between","w-full"],[1,"text-3xl","uppercase"],["mat-raised-button","",3,"click"],[1,"text-xl"],[1,"outer-div","pt-8"],[1,"grid-wrapper","w-full"],["id","myGrid",1,"ag-theme-material",2,"width","100%","height","100%",3,"columnDefs","defaultColDef","rowData","gridReady"],["agGrid",""]],template:function(l,s){1&l&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"span",2),e._uU(3,"User Management"),e.qZA(),e.TgZ(4,"button",3),e.NdJ("click",function(){return s.openModal()}),e.TgZ(5,"mat-icon"),e._uU(6,"add"),e.qZA(),e.TgZ(7,"span",4),e._uU(8,"Add Role"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(9,"div",5),e.TgZ(10,"div",6),e.TgZ(11,"ag-grid-angular",7,8),e.NdJ("gridReady",function(c){return s.onGridReady(c)}),e.qZA(),e.qZA(),e.qZA()),2&l&&(e.xp6(11),e.Q6J("columnDefs",s.columnDefs)("defaultColDef",s.defaultColDef)("rowData",s.rowData))},directives:[g.lW,f.Hw,T.N8],styles:[".outer-div[_ngcontent-%COMP%]{height:80%;display:flex;flex-direction:column}.button-bar[_ngcontent-%COMP%]{margin-bottom:1rem}.grid-wrapper[_ngcontent-%COMP%]{flex:1 1 auto}"]}),o})()},{path:"create",component:Z},{path:"**",redirectTo:"view-roles"}];let P=(()=>{class o{}return o.\u0275fac=function(l){return new(l||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[R.ez,y.Bz.forChild(L)],y.Bz]}),o})();const G={suppressScrollX:!0};let W=(()=>{class o{}return o.\u0275fac=function(l){return new(l||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({providers:[{provide:D.op,useValue:G}],imports:[[R.ez,P,T.sF,a.u5,a.UX,D.Xd,w.QW,F.t,I.Tx,M.g0,f.Ps,U.p9,x.N6,O.AV,g.ot,J.SJ,q.ie,p.Is,v.lN,b.c,z.LD]]}),o})()}}]);