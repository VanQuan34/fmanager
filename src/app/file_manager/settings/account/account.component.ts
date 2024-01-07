// login.component.ts
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { IMenuSidebar } from '../../sidebar/sidebar.component';

@Component({
  selector: 'file-manager-settings-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class FileManagerSettingsAccountComponents extends MoWbDetectionComponent {

  roleList: any;
  role: string;

  @Input() tabActive: IMenuSidebar

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService
  ) {
    super(_changeDetection);
  }
  
  @Input() user: any;

  override ngOnInit(): void {
    this.roleList = [
      {
        id: 1,
        name: 'Staff'
      },
      {
        id: 2,
        name: 'Admin'
      },
      {
        id: 3,
        name: 'User'
      },
    ]
    this.role = this.user.role;
  }

  handleOnSelectRole(role: any[]){
    this.role = role[0].id;
    // this.detectChanges();
    console.log('role==', role)
  }

  handleOnClickUpdateUser(e: MouseEvent){
    this._toast.show('success', 'Update thành công')
  }

}
