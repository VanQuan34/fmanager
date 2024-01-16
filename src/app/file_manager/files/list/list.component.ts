// login.component.ts
import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, OnInit, ViewChild } from '@angular/core';
import { FileManagerAuthApiService } from 'src/app/api/auth/authApi';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { GLOBAL } from 'src/app/common/types/global/global';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { MoWbTableComponent } from 'src/app/components/table/table.component';
import { FileManagerListDetailsPreviewComponents } from './preview/preview.component';
import { AddComponentToBodyService } from 'src/app/api/common/add-component-to-body.service';
import { FileManagerListEditComponents } from './edit/edit.component';

interface ITableColumnSetting {
  type: 'CHECKBOX' | 'TEXT',
  key: string,
  name?: string;
  width: number;
  widthUnit: 'px' | '%';
  textAlign: 'start' | 'center' | 'end';
}

@Component({
  selector: 'file-manager-list-details',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FileManagerListDetailsComponents extends MoWbDetectionComponent {

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
  offset: number;
  searchString: string;
  

  @ViewChild('table') tableRef: MoWbTableComponent;

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService,
    private authApiService: FileManagerAuthApiService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    public _domService: AddComponentToBodyService,
    public _injector: Injector,
  ) {
    super(_changeDetection);
  }

  override ngOnInit(): void {
    this.offset = 0;
    this.searchString = '';
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
        name: 'Dung lượng',
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

  async fetchListFiles(){
    try {
      const apiUrl = `https://file.io/?offset=${this.offset}&limit=15&search=${this.searchString}`;
      const apiKey = '37GQNFE.NC1PWFJ-Y2R410S-GWCCW7M-DD7520A';
  
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success:', data);
      this.offset = this.offset + 15;
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to propagate it to the caller
    }
  }

  /*
   * fetch data
   * @param fetchParam 
   * @returns 
   */
  async fetchData() {
    this.detectChanges();
    const response = await this.fetchListFiles();
    this.isLoading = false;
    console.log('res===', response);
    if (!response || response.status !== 200) {
      this.isLoading = false;
      // this._toast.show('error', response.message);
      this._toast.show('error', response?.message || 'Có vấn đề xảy ra');

      this.tableRef.handleLoadDataCompleted(false, [], this.offset);
      return;
    };
    const items = response.nodes;
    if (this.tableRef) {
      this.tableRef.handleLoadDataCompleted(true, items, this.offset);
    }
  }

  handleOnTableLoadedData(e: any){
    this.fetchData();
    this.tableRef.canLoadMore = true;
    this.detectChanges();
  }

  editSiteName(file: any){
    const modalRef = this._componentFactoryResolver.resolveComponentFactory(FileManagerListEditComponents).create(this._injector);
    modalRef.instance.fileInfo = file;
    modalRef.instance.title = 'Sửa tên trang';
    modalRef.instance.width = '550px';
    modalRef.instance.onNameChange.subscribe((name)=>{
      file.name = name;
      this.detectChanges();
      this._domService.removeComponentFromBody(modalRef);
    });
    modalRef.instance.onClose.subscribe(() => {
      setTimeout(() => {
        this._domService.removeComponentFromBody(modalRef);
      }, 500);
    });
    this._domService.addDomToBody(modalRef);
  }

  handleOnChangeCheckedAll(e: any){}
  handleOnChangeCheckedItem($event: any, rowItem: any){}
  handleOnClickEditSite($event: any, rowItem: any){}
  handleOnClickShowReport(rowItem: any){}
  handleOnSelectMenuItem(event: any, item: any){
    switch (event.id) {
      case 'edit-site':
        this.editSiteName(item);
        break;
      case 'report':
        // this.handleOnClickReport(item);
        break;
      case 'edit-name':
        // this.editSiteName(item);
        break;
      case 'preview':
        // this.previewSite(item);
        break;
      case 'copy':
        // this.duplicateSite(item);
        break;
      case 'export':
        // this.exportFileMoPage(item);
        break;
      case 'pending':
        // this.unPublishSite(item);
        break;
      case 'move':
        // this.moveSiteToFolder(item);
        break;
      case 'remove':
        // this.removeSite(item);
        break;
      case 'seo':
        // this.showSettingSEO(item);
        break;  
    }
  }
  handleOnClickItemMenu($event: any, rowItem: any){}

  handleOnClickPreview(link: string){
    const modalRef =  this._componentFactoryResolver.resolveComponentFactory(FileManagerListDetailsPreviewComponents).create(this._injector);
    modalRef.instance.src = link;
    // modalRef.instance.categoryList = this.categoryList;
    modalRef.instance.onClose.subscribe((event: any) => {
      this._domService.removeComponentFromBody(modalRef);
      this.detectChanges();
    });
    
    this._domService.addDomToBody(modalRef);
  }

}
