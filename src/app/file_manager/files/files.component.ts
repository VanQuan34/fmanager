// login.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';

@Component({
  selector: 'file-manager-list',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FileManagerListComponents implements OnInit {

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
