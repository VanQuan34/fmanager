import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, EventEmitter, Output, ViewChild } from "@angular/core";
import { MoWbV4ModalComponent } from "src/app/components/modal/v4/modal/modal.component";
// import { IFolderItem } from "src/app/landing/templates/folder/folder.component";
// import { MoWbLandingV4SitesFolderAddComponent } from "../../folder/add/add.component";
// import { ICategoryItem } from "../../folder/folder.component";
import { ToastTranslateService } from "src/app/api/common/toast-translate.service";
// import { MoWbSiteApiService } from "src/app/api/site/siteApi";
import { AddComponentToBodyService } from "src/app/api/common/add-component-to-body.service";
// import { MoWbDropdownComponent, MoWbInputComponent } from "src/app/components";
import { MoWbFileUploadV4Component } from "src/app/components/upload/file-upload-v4/file-upload.component";
import { MoWbInputComponent } from "src/app/components/input/input.component";
import { MoWbSelectComponent } from "src/app/components/select/select.component";
import { HttpClient } from "@angular/common/http";
// import { MoWbEditorSiteService } from "../../editor-site.service";
// import { IPageSite } from "src/app/common/types/site/page-site";

declare var IntegrateMicroSites: any;

@Component({
  selector: 'file-manager-list-toolbar-add',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileManagerListToolbarUploadComponents extends MoWbV4ModalComponent {
  loading: boolean = false;
  siteName: string = '';
  categoryId: string;
  file: File;
  apiKey: string;


  @Input() override zIndex: number;
  // @Input() categoryList: IFolderItem[];
  @Input() override isHideMenu: boolean = true;
  
  // @Output() onAddFolder = new EventEmitter<ICategoryItem>;
  @Output() onAddNewFile = new EventEmitter<any>;
  
  @ViewChild('input') inputName: MoWbInputComponent;
  @ViewChild('select') selectFolder: MoWbSelectComponent;
  @ViewChild('upload') upload!: MoWbFileUploadV4Component;

  constructor(
    private _toast: ToastTranslateService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    public override _changeDetection: ChangeDetectorRef,
    // private _siteService: MoWbSiteApiService,
    public _domService: AddComponentToBodyService,
    public _injector: Injector,
    private http: HttpClient,
    // private _editorSiteService: MoWbEditorSiteService,

    // private _router: Router,
  ) {
    super(_changeDetection)
  }

  override ngOnInit(): void {
    this.apiKey = '37GQNFE.NC1PWFJ-Y2R410S-GWCCW7M-DD7520A';
  }

  handleError(event: any) {
    console.log('validation file upload fail:', event);

  }


  /**
 * validate
 * @returns 
 */
  validate() {
    let result: boolean = true;
    if (!this.inputName.validate()) {
      result = false;
    }
    if (!this.selectFolder.validate()) {
      result = false;
    }
    if (!this.upload.validate()) {
      result = false;
    }
    return result;
  }

  // async createNewSite(file: any) {
  //   const response = await this._siteService.importFile(this.siteName, this.categoryId, file);
  //   if(!response || response.code !== 200) {
  //     return false;
  //   }
  //   return true;
  // }
  /**
    * handle on select category
    * @param category 
    */
  handleOnSelectCategory(category: any) {
    this.categoryId = category[0].id;
  }

  async handleOnClickUploadAddSite(event: any) {
    
    // if (!this.validate()) {
    //   return;
    // }
    this.loading = true;
    this.detectChanges();

    // const formData = new FormData();

    // formData.append('file', this.file, this.file.name);
    // formData.append('name', this.siteName);
    // formData.append('category', this.categoryId);

    // const response = await ;

    // if(!response || response.code !== 200){
    //   // this._toast.show('error', response.message);
    //   this._toast.show('error', response.message);

    //   this.loading = false;
    //   this.detectChanges();
    //   return;
    // }

    const currentUtcTime = new Date();
    const apiUrl = 'https://file.io/';

    // Calculate the UTC time 30 days ahead
    const utcTime30DaysAhead = new Date(currentUtcTime);
    utcTime30DaysAhead.setUTCDate(currentUtcTime.getUTCDate() + 30);
    const expire = utcTime30DaysAhead.toISOString();

    const formData = new FormData();
    formData.append('title', this.siteName);
    formData.append('file', this.file);
    formData.append('expires', expire);
    formData.append('maxDownloads', '1');
    formData.append('autoDelete', 'true')

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(data.status !== 200){
          this._toast.show('error', data?.message);
          return;
        }
        this.loading = false;
        this.onAddNewFile.emit(data);
        this.close();
        this._toast.show('success', 'Upload file thành công');
        return;
      })
      .catch(error => {
        console.error('Error:', error);
        this.loading = false;
        this.detectChanges();
      });
  }

  /**
   * edit site
   * @param newSite 
   */
  editSite(newSite: any){
    // this._editorSiteService.editSite({
    //   siteId: newSite.info.id,
    //   siteName: newSite.info.name,
    //   zIndex: this.zIndex,
    //   isNewSite: false,
    //   onCloseCallback: (isUpdated: boolean) => {
    //     window.location.reload();
    //   }
    // })
  }
  
  handleOnFileChanged(event: any) {
    this.file = event[0];
    this.detectChanges();
  }


  /**
 * handle input error
 * @param e 
 */
  handleErrorInputName(e: boolean) {
    // this.siteName = '';
  }


  /**
   * set value name site
   * @param value 
   */
  handleOnNameValueChange(value: string) {
    this.siteName = value;
    this.detectChanges();
  }

  /**
 * handle quick add folder
 * @param $event 
 */
  handleOnAddNewFolder(event: any) {
    // const modalRef = this._componentFactoryResolver.resolveComponentFactory(MoWbLandingV4SitesFolderAddComponent).create(this._injector);
    // modalRef.instance.zIndex = this.zIndex + 50;
    // modalRef.instance.width = '550px';
    // modalRef.instance.title = 'Tạo Landing Page';

    // modalRef.instance.onClose.subscribe((event: any) => {
    //   this._domService.removeComponentFromBody(modalRef);
    //   this.detectChanges();
    // });
    // modalRef.instance.onAddFolder.subscribe((folder: ICategoryItem) => {
    //   this.categoryList.unshift(folder);
    //   this.onAddFolder.emit(folder);
    //   this._domService.removeComponentFromBody(modalRef);
    // });

    // this._domService.addDomToBody(modalRef);
  }


}