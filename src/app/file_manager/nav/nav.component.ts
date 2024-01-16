// login.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { CacheKeys } from 'src/app/common/define/cache-keys.define';
import { IMenuListItem } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'file-manager-nav-components',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class FileManagerNavComponents implements OnInit {

  isToggle: boolean;
  menuItems: IMenuListItem[];

  @Output() onClickToggle = new EventEmitter<boolean>;

  constructor(
    private _router:Router,
  ){}

  ngOnInit(): void {
    this.menuItems = [
      {
        id: 'name',
        name: 'Tạ Văn Quân'
      },
      {
        id: 'details',
        name: 'Thông tin tài khoản'
      },
      {
        id: 'logout',
        name: 'Đăng xuất'
      },
    ]
  }

  handleOnClickToggleMenu(e: MouseEvent){
    this.isToggle = !this.isToggle;
    this.onClickToggle.emit(this.isToggle);
    console.log('this.isToggle=', this.isToggle);
  }
  
  handleOnSelectItem(item: IMenuListItem){
    switch (item.id){
      case 'logout':
        localStorage.removeItem(CacheKeys.KEY_TOKEN);
        setTimeout(()=>{
          // this.router.navigate(['/login']);
          window.location.href = '/login';
        })
        break;
      case 'details':
        this._router.navigate(['/settings']);
        break;  
      default:;
      break;
    }
  }

}
