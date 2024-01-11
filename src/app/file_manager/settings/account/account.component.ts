// login.component.ts
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { IMenuSidebar } from '../../sidebar/sidebar.component';
import { GLOBAL } from 'src/app/common/types/global/global';
import { IToggleEvent } from 'src/app/components/button/api/toggle-event';
import { MoWbInputComponent } from 'src/app/components/input/input.component';

@Component({
  selector: 'file-manager-settings-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class FileManagerSettingsAccountComponents extends MoWbDetectionComponent {

  roleList: any;
  departmentList: any;
  role: string;
  status: boolean;
  userInfo: any;

  @Input() tabActive: IMenuSidebar

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService
  ) {
    super(_changeDetection);
  }
  
  @Input() user: any;

  @ViewChild('firstName') firstName: MoWbInputComponent;
  @ViewChild('lastName') lastName: MoWbInputComponent;

  override ngOnInit(): void {
    this.roleList = [
      {
        id: 'staff',
        name: 'Staff'
      },
      {
        id: 'admin',
        name: 'Admin'
      },
      {
        id: 'user',
        name: 'User'
      },
    ]

    this.departmentList = [
      {
        id: 'Developer',
        name: 'Developer'
      },
      {
        id: 'marketing',
        name: 'Marketing'
      },
      {
        id: 'human',
        name: 'Nhân sự'
      },
    ]
    // this.role = this.user.role;
    console.log('GLOBAL.userInfo=', GLOBAL.userInfo);
    this.userInfo =  GLOBAL.userInfo;
  }

  handleOnSelectRole(role: any[]){
    this.role = role[0].id;
    // this.detectChanges();
    console.log('role==', role)
  }

  handleOnChangeStatus(e: IToggleEvent){
    this.status = e.active;
  }

  handleOnClickUpdateUser(e: MouseEvent){
    this._toast.show('success', 'Update thành công')
  }

  handleOnChangeName(type: 'first_name' | 'last_name'){
    switch(type){
      case 'first_name':
        this.userInfo.firstName = this.firstName.getValue();
        console.log(' this.userInfo.firstName=',  this.userInfo.firstName);
        break;
      case 'last_name':
        this.userInfo.lastName = this.lastName.getValue();
        break;
    }
  }

}
