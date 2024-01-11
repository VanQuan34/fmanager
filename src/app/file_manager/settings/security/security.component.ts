// login.component.ts
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { GLOBAL } from 'src/app/common/types/global/global';
import { MoWbInputComponent } from 'src/app/components/input/input.component';

@Component({
  selector: 'file-manager-settings-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class FileManagerSettingsSecurityComponents extends MoWbDetectionComponent {

  userInfo: any;
  
  @ViewChild('firstName') firstName: MoWbInputComponent;
  @ViewChild('lastName') lastName: MoWbInputComponent;

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService
  ) {
    super(_changeDetection);
  }

  override ngOnInit(): void {
    this.userInfo = GLOBAL.userInfo;
  }

  comparePassword(){

  }

  handleOnChangeOldPassword(password: string){

  }

  handleOnChangeNewPassword(password: string, type: 'new' | 'repeat'){
    
  }

  handleOnClickUpdateUser(e: MouseEvent){

  }

}
