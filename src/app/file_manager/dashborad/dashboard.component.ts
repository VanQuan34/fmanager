// login.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';

@Component({
  selector: 'file-manager-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class FileManagerDashboard implements OnInit {

  username = '';
  password = '';
  isPending: boolean;

  ngOnInit(): void {
    
  }

  handleUploadFile(e: any){
    console.log('file===', e);
  }

  handleOnWidthChange(e: any){

  }

}
