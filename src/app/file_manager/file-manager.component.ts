// login.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';

@Component({
  selector: 'file-manager-components',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponents implements OnInit {

  username = '';
  password = '';
  isPending: boolean;
  isToggle: boolean;

  ngOnInit(): void {
    this.isToggle = true;
  }

  handleOnClickToggleMenu(e: MouseEvent){
    this.isToggle = !this.isToggle;
  }

}
