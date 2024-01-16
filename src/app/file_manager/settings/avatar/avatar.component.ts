// login.component.ts
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';
import { MoWbV4ModalComponent } from 'src/app/components/modal/v4/modal/modal.component';

@Component({
  selector: 'file-manager-settings-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class FileManagerSettingsAvatarComponents extends MoWbDetectionComponent {

  loading: boolean;
  photos: any;
  loaded: boolean;
  selectedId: number;
  page: number;
  disable: boolean;
  avatar: any;

  @Input() zIndex: number;
  @Input() title: string;
  @Input() width: string;
  @Input() height: string;

  @Output() onClose = new EventEmitter<any>();
  @Output() onChangeAvatar = new EventEmitter<any>();
  @ViewChild('container') container: ElementRef;
  @ViewChild('modal') modal: MoWbV4ModalComponent;

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService
  ) {
    super(_changeDetection);
  }

  override ngOnInit(): void {
    this.page = 1;
    this.disable = true;
    this.fetchImages();
  }

  handleOnClose(e: MouseEvent){
    this.onClose.emit();
  }

  handleOnChangeAvatar(e: MouseEvent){
    this.onChangeAvatar.emit(this.avatar);
    // this.onClose.emit();
  }

  async fetchImages(isList: boolean = true){
    const apiUrl = `https://api.pexels.com/v1/curated?page=${this.page}&per_page=40`;
    const apiKey = 'PvtZ2ugjNRVWfpoJN2BG8FA8fZkarObedConBiV9rOVblamFQbh2yW9t';
    
    await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': apiKey,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if(isList){
          this.photos = data.photos;
          this.loaded = true;
          return;
        }
        const scrollH = this.modal.containerEl.nativeElement.scrollHeight;
        console.log('scrollH=', scrollH);
        this.loaded = true;
        this.photos.push(...data.photos);
        this.modal.emitted = false;
        this.modal.containerEl.nativeElement.scrollTop = scrollH - 50;
        console.log(' this.photos=',  this.photos);
      })
      .catch(error => {
        this.photos = [];
        console.error('Error:', error);
      });
  }

  handleOnClickImage(image: any, idx: number){
    this.selectedId = idx;
    this.disable = false;
    this.avatar = image;
  }

  handleOnLoadImages(e: any){
    this.loaded = false;
    this.page = this.page + 1;
    this.fetchImages(false);
  }

}
