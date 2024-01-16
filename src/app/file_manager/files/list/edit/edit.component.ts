import { Component, Output, ViewChild, EventEmitter, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MoWbInputComponent } from 'src/app/components/input/input.component';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { MoWbV4ModalComponent } from 'src/app/components/modal/v4/modal/modal.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'file-manager-list-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileManagerListEditComponents extends MoWbV4ModalComponent{
  
  override isPending: boolean = false;

  @Input() fileInfo: any;
  @Input() override width: string;
  @Input() override title: string;
  @Input() override isHideMenu: boolean = true;
  
  @Output() override onClose = new EventEmitter<any>();
  @Output() onNameChange = new EventEmitter<any>()
  @ViewChild('input') inputName: MoWbInputComponent;

  constructor(
    private _toast : ToastTranslateService,
    public override _changeDetection: ChangeDetectorRef,
    private _translate: TranslateService,
  ) { 
    super(_changeDetection);
  }

  override ngOnInit(): void {
  }

  override ngAfterViewInit() {
    this.detectChanges();
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
    return result;
  }

  /**
   * update site info
   * @returns 
   */
  async updateSite() {
    this.isPending = true;
    this.detectChanges();

    this.onNameChange.emit(this.inputName.value);
  }

  /**
   * handle on edit button click
   * @param input 
   */
  handleOnClickEditName(event: MouseEvent) {
    if(!this.validate()){
      return;
    }
    this.updateSite();
  }
}
