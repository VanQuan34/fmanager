// login.component.ts
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FileManagerAuthApiService } from 'src/app/api/auth/authApi';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { GLOBAL } from 'src/app/common/types/global/global';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { MoWbTableComponent } from 'src/app/components/table/table.component';

interface ITableColumnSetting {
  type: 'CHECKBOX' | 'TEXT',
  key: string,
  name?: string;
  width: number;
  widthUnit: 'px' | '%';
  textAlign: 'start' | 'center' | 'end';
}

@Component({
  selector: 'file-manager-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class FileManagerUsersComponents extends MoWbDetectionComponent {

  users: any = [];
  tableColumns: ITableColumnSetting[] = [];
  siteList: Array<any> = [];
  tableMenuItems: any[] = [];
  menuItems: any[] = [];
  isLoading: boolean;
  hasScroll: boolean = false;
  isCheckedAll: boolean;
  isCheckedItem: boolean;
  isClick: boolean;
  isToggle:boolean;
  

  @ViewChild('table') tableRef: MoWbTableComponent;

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService,
    private authApiService: FileManagerAuthApiService,
  ) {
    super(_changeDetection);
  }

  override ngOnInit(): void {
    this.initData();
    // this.fetchListUsers();
  }

   /**
   * init data
   */
  initData() {
    this.tableColumns = [
      {
        type: 'CHECKBOX',
        key: 'chk',
        name: '',
        width: 3,
        widthUnit: '%',
        textAlign: 'center',
      },
      {
        type: 'TEXT',
        key: 'name',
        name: 'Name',
        width: 20,
        widthUnit: '%',
        textAlign: 'start'
      },
      {
        type: 'TEXT',
        key: 'email',
        name: 'Địa chỉ Email',
        width: 20,
        widthUnit: '%',
        textAlign: 'start'
      },
      {
        type: 'TEXT',
        key: 'created_time',
        name: 'Ngày đăng tải',
        width: 20,
        widthUnit: '%',
        textAlign: 'start'
      },
      {
        type: 'TEXT',
        key: 'status',
        name: 'Trạng thái',
        width: 15,
        widthUnit: '%',
        textAlign: 'start'
      },
      {
        type: 'TEXT',
        key: 'role',
        name: 'Vai trò  ',
        width: 13.5,
        widthUnit: '%',
        textAlign: 'center'
      },
    ];
    this.isLoading = false;

    // init table menu items
    this.tableMenuItems = [
      {
        id: 'edit-site',
        name: 'Chỉnh sửa trang',
        divider: true,
        icon: 'mo-icn-edit'
      },
      // {
      //   id: 'report',
      //   name: 'Báo cáo',
      //   divider: true,
      //   icon: 'mo-icn-report',
      //   disable: true
      // },
      {
        id: 'edit-name',
        name: 'Sửa tên trang',
        divider: true,
        icon: 'mo-icn-editor-color-text'
      },
      {
        id: 'preview',
        name: 'Xem trước trang',
        divider: true,
        icon: 'mo-icn-eye-outline'
      },
      {
        id: 'copy',
        name: 'Sao chép trang',
        divider: true,
        icon: 'mo-icn-copy'
      },
      {
        id: 'export',
        name: 'Xuất trang .mopage',
        divider: true,
        icon: 'mo-icn-download-outline'
      },
      {
        id: 'pending',
        name: 'Ngừng xuất bản',
        divider: true,
        icon: 'mo-icn-alert-triangle-outline',
        disable: false
      },
      {
        id: 'move',
        name: 'Chuyển folder',
        divider: true,
        icon: 'mo-icn-move-to-folder'
      },
      {
        id: 'seo',
        name: 'Thiết lập SEO',
        divider: true,
        icon: 'mo-icn-social-overview'
      },
      {
        id: 'remove',
        name: 'Xoá trang',
        divider: false,
        icon: 'mo-icn-remove',
        disable: false
      },
    ];
    this.menuItems = this.tableMenuItems;
  }

  handleOnClickNav(e: boolean){
    this.isToggle = e;
    console.log('this.isToggle=', this.isToggle);
  }

  async fetchListUsers(){
    const response = await this.authApiService.fetchListUsers();
    if(response.code === 500){
      this._toast.show('error', 'Có vấn đề với kết nối server');
      return;
    }
    if(response.code === 200){
      this.users = response.data;
      GLOBAL.userInfo = this.users;
      console.log('response Users=', response);
    }
  }

  /*
   * fetch data
   * @param fetchParam 
   * @returns 
   */
  async fetchData() {
    this.detectChanges();
    let response = await this.authApiService.fetchListUsers();
    // console.log('site data loaded=', response);
    this.isLoading = false;
    if (!response || response.code !== 200) {
      this.isLoading = false;
      // this._toast.show('error', response.message);
      this._toast.show('error', response.message);

      this.tableRef.handleLoadDataCompleted(false, [], null);
      return;
    };
    const items = response.data;
    if (this.tableRef) {
      this.tableRef.handleLoadDataCompleted(true, items, null);
    }
  }

  handleOnTableLoadedData(e: any){
    this.fetchData();
  }

  handleOnClickOverlay(e: MouseEvent){
    this.isClick = !this.isClick;
  }

  handleOnChangeCheckedAll(e: any){}
  handleOnChangeCheckedItem($event: any, rowItem: any){}
  handleOnClickEditSite($event: any, rowItem: any){}
  handleOnClickShowReport(rowItem: any){}
  handleOnSelectMenuItem($event: any, rowItem: any){}
  handleOnClickItemMenu($event: any, rowItem: any){}

}
