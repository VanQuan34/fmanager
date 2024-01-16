import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
// import { MoWbTemplateApiService } from '../../../api/landing/templateApi';
// import { MoWbSiteCategoryApiService } from 'src/app/api/site/siteCategoryApi';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { MoWbSelectToggleComponent } from 'src/app/components/select/toggle/toggle.component';
// import { MoWbLandingV4SitesToolbarAddComponent } from './add/add.component';
import { AddComponentToBodyService } from 'src/app/api/common/add-component-to-body.service';
import { FileManagerListToolbarUploadComponents } from './upload/upload.component';
// import { IFolderItem } from 'src/app/landing/templates/folder/folder.component';
// import { ICategoryItem } from '../folder/folder.component';
// import { MoWbLandingTemplatesModalComponent } from 'src/app/landing/templates/modal/modal.component';
// import { MoWbLandingV4SitesToolbarUploadComponent } from './upload/upload.component';
// import { IPageSite } from 'src/app/common/types/site/page-site';

interface IItemStatus{
  id: string,
  name: string
}

@Component({
  selector: 'file-manager-list-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class FileManagerListToolbarComponents extends MoWbDetectionComponent {

  addPageOptionItems: any[] = [];
  pageStateItems: IItemStatus[] = [];
  isShowToggle: boolean = false;
  valueSearch: string;
  isStatus:boolean = true;
  status: 'published' | 'unpublished' | 'stopped' | 'all';

  @Input() isBack: boolean = true;
  // @Input() categoryList: IFolderItem[];
  @Input() zIndex: number;

  @Output() onValueSearch = new EventEmitter<string>;
  // @Output() onAddFolder = new EventEmitter<ICategoryItem>;
  @Output() onAddNewFile = new EventEmitter<any>;
  @Output() onChangeStatus = new EventEmitter<any>;

  // @Output() onClose = new EventEmitter<any>();

  @ViewChild('selectToggle') selectToggle: MoWbSelectToggleComponent;

  constructor(
    private _toast: ToastTranslateService,
    // private _categoryService: MoWbSiteCategoryApiService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    public override _changeDetection: ChangeDetectorRef,
    public _domService: AddComponentToBodyService,
    public _injector: Injector,
  ) {
    super(_changeDetection)
  }

  override ngOnInit() {
    this.initData();
  }

  override ngAfterViewInit() {
  }

  /**
   * init data
   */
  async initData() {
    // add page options
    this.addPageOptionItems = [
      { 
        id: 'add-blank',
        svg: 'empty-page.svg',
        title: 'Tải lên file mới',
        sub: 'File tải lên được lưu trữ nội bộ'
      },
      {
        id: 'add-template',
        svg: 'template-page.svg',
        title: 'Sử dụng giao diện mẫu',
        sub: 'Sử dụng các giao diện đã có trong thư viện của chúng tôi'
      },
      {
        id: 'upload',
        svg: 'upload-page.svg',
        title: 'Tải file lên',
        sub: 'Sử dụng file thiết kế sẵn có đuôi “.mopage” từ máy tính của bạn'
      },
    ];

    // page state items
    this.pageStateItems = [
      {
        id: 'all',
        name: 'Tất cả'
      },
      {
        id: 'unpublished',
        name: 'Chưa xuất bản'
      },
      {
        id: 'published',
        name: 'Đã xuất bản'
      },
      {
        id: 'stopped',
        name: 'Ngừng xuất bản'
      },
    ]
  }

  /**
   * add new site blank
   */
  addPageBlank(){
    // const modalRef =  this._componentFactoryResolver.resolveComponentFactory(MoWbLandingV4SitesToolbarAddComponent).create(this._injector);
    // modalRef.instance.zIndex = this.zIndex + 50;
    // modalRef.instance.width = '550px';
    // modalRef.instance.title = 'Tạo Landing Page';
    // modalRef.instance.categoryList = this.categoryList;

    // modalRef.instance.onClose.subscribe((event: any) => { 
    //   this._domService.removeComponentFromBody(modalRef);
    //   this.detectChanges();
    // });
    // modalRef.instance.onAddFolder.subscribe(folder => {
    //   this.onAddFolder.emit(folder);
    // });

    // modalRef.instance.onAddNewFile.subscribe((site: IPageSite) => {
    //   this.onAddNewFile.emit(site);
    //   this._domService.removeComponentFromBody(modalRef);
    // })
    
    // this._domService.addDomToBody(modalRef);
  }

  onShowModalUploadFile(){
    const modalRef =  this._componentFactoryResolver.resolveComponentFactory(FileManagerListToolbarUploadComponents).create(this._injector);
    modalRef.instance.zIndex = this.zIndex + 50;
    modalRef.instance.title = 'Tải file lên lưu trữ';
    // modalRef.instance.categoryList = this.categoryList;
    modalRef.instance.onClose.subscribe((event: any) => { 
      this._domService.removeComponentFromBody(modalRef);
      this.detectChanges();
    });

    modalRef.instance.onAddNewFile.subscribe((file: any) => {
      this.onAddNewFile.emit(file);
      this._domService.removeComponentFromBody(modalRef);
    })
    
    this._domService.addDomToBody(modalRef);
  }

  /**
   * add site from template
   */
  addSiteFromTemplate() {
    // const modalRef =  this._componentFactoryResolver.resolveComponentFactory(FileManagerListToolbarUploadComponents).create(this._injector);
    // modalRef.instance.zIndex = this.zIndex + 50;
    // modalRef.instance.categoryList = this.categoryList;
    // modalRef.instance.isTemplateModal = false;
    // modalRef.instance.isCreate = true;
    // modalRef.instance.onClose.subscribe((event: any) => { 
    //   this._domService.removeComponentFromBody(modalRef);
    //   this.detectChanges();
    // });
    // if(modalRef.instance.listRef){
    //   modalRef.instance.listRef.onClose.subscribe((event: any) => { 
    //     this._domService.removeComponentFromBody(modalRef);
    //     this.detectChanges();
    //   });
    // }
    // this._domService.addDomToBody(modalRef);
  }

  /**
   * upload site to create
   */
  uploadSite(){
    this.onShowModalUploadFile();
  }

  /**
   * handle on add page click
   * @param item 
   */
  handleOnAddPageClick(item: any) {
    switch(item.id){
      case 'add-blank':
        this.addPageBlank();
        break;
      case 'add-template':
        this.addSiteFromTemplate();
        break;
      case 'upload':
        this.uploadSite();
      break;
      default: break;      
    }
    this.selectToggle.close();
  }

  /**
   * handle input search
   * @param value 
   */
  handleOnInputValueChange(value: string){
    this.valueSearch = value;
    this.onValueSearch.emit(value);
  }

  /**
   * select status
   * @param item 
   */
  handleOnSelectStatus(item: any){
    this.status = item[0].id;
    this.onChangeStatus.emit(this.status);
  }
}
