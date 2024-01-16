// login.component.ts
import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { IMenuSidebar } from '../../sidebar/sidebar.component';
import { GLOBAL } from 'src/app/common/types/global/global';
import { IToggleEvent } from 'src/app/components/button/api/toggle-event';
import { MoWbInputComponent } from 'src/app/components/input/input.component';
import { FileManagerSettingsAvatarComponents } from '../avatar/avatar.component';
import { AddComponentToBodyService } from 'src/app/api/common/add-component-to-body.service';

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
  avatar: string;

  @Input() tabActive: IMenuSidebar
  @Input() user: any;

  @ViewChild('firstName') firstName: MoWbInputComponent;
  @ViewChild('lastName') lastName: MoWbInputComponent;

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _injector: Injector,
    private _domService: AddComponentToBodyService, 
  ) {
    super(_changeDetection);
  }

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

  handleOnClickChangeAvatar(e: MouseEvent){
    const modalRef =  this._componentFactoryResolver.resolveComponentFactory(FileManagerSettingsAvatarComponents).create(this._injector);
    modalRef.instance.zIndex = 5000;
    modalRef.instance.title = 'Thay đổi ảnh đại diện';
    modalRef.instance.width = '800px';
    modalRef.instance.height = '500px';

    modalRef.instance.onClose.subscribe((event: any) => { 
      this._domService.removeComponentFromBody(modalRef);
    });
    modalRef.instance.onChangeAvatar.subscribe((avatar: any) => {
      this.avatar = avatar.src.tiny;
      console.log(this.avatar);
      
      this._domService.removeComponentFromBody(modalRef);
    });

    this._domService.addDomToBody(modalRef);
  }

}
