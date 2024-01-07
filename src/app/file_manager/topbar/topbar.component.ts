// login.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { CacheKeys } from 'src/app/common/define/cache-keys.define';
import { IMenuListItem } from 'src/app/components/menu/menu.component';

@Component({
  selector: 'file-manager-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class FileManagerTopbarComponents implements OnInit {

  menuItems: IMenuListItem[];

  @Input() menuActive: string;

  constructor(
    private router:Router,
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

  handleOnSelectItem(item: IMenuListItem){
    switch (item.id){
      case 'logout':
        localStorage.removeItem(CacheKeys.KEY_TOKEN);
        setTimeout(()=>{
          // this.router.navigate(['/login']);
          window.location.href = '/login';
        })
        break;
      default:;
      break;
    }
  }

}
