// login.component.ts
import { Component, OnInit } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { IMenuSidebar } from '../sidebar/sidebar.component';

@Component({
  selector: 'file-manager-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class FileManagerSettingsComponents implements OnInit {

  menuItems: IMenuSidebar[];
  tabActive: IMenuSidebar;
  userInfo: any;

  ngOnInit(): void {
    this.menuItems = [
      {
        id: 'account',
        name: 'Account'
      },
      {
        id: 'security',
        name: 'Information'
      },
      
    ]
    this.tabActive = {
      id: 'account',
      name: 'Account'
    };
  }

  handleOnClickTab(item: IMenuSidebar){
    console.log('item=', item);
    this.tabActive = item;
  }

}
