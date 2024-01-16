// login.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { FileManagerListDetailsComponents } from './list/list.component';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';

@Component({
  selector: 'file-manager-list',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FileManagerListComponents extends MoWbDetectionComponent {

  username = '';
  password = '';
  isPending: boolean;
  isToggle:boolean;

  @ViewChild('list') _list: FileManagerListDetailsComponents;

  override ngOnInit(): void {
    
  }

  handleUploadFile(e: any){
    console.log('file===', e);
  }

  handleOnWidthChange(e: any){
  }

  handleOnClickNav(e: boolean){
    this.isToggle = e;
    console.log('this.isToggle=', this.isToggle);
  }

  handleOnAddNewFile(file: any){
    console.log('file==', file);
    if(this._list.tableRef){
      this._list.tableRef.items.unshift(file);
      this._list.tableRef.containerEl.nativeElement.scrollTop = 50;
      this._list.tableRef.containerEl.nativeElement.scrollTop = 0;
      this.detectChanges();
    }
  }

  handleOnChangeSearchValue(valueSearch: string){
    this._list.searchString = valueSearch;
    this._list.offset = 0;
    this._list.tableRef.reLoadData();
  }

}
