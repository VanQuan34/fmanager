// login.component.ts
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
export interface IMenuSidebar{
  id: string,
  name: string,
  icon?: string,
  link?: string,
  classInclude?: string
}

@Component({
  selector: 'file-manager-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class FileManagerSidebarComponents implements OnInit {

  username = '';
  password = '';
  isPending: boolean;
  menuItems: IMenuSidebar[];

  @Input() menuActive: string;
  @Input() isToggle: boolean;

  @ViewChild('sidebar') _sidebar: HTMLElement;

  @Output() onClickOverlay = new EventEmitter;

  ngOnInit(): void {
    this.menuItems = [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'mo-icn-dashboard_no_widget',
        link: '/dashboard'
      },
      {
        id: 'files',
        name: 'Files',
        icon: 'mo-icn-File',
        link: '/files'
      },
      {
        id: 'users',
        name: 'Users',
        icon: 'mo-icn-assigned',
        link: '/users',
        classInclude: 'flex-grow-1'
      },
    ]
  }

  ngOnAfterViewInit(){}

}
