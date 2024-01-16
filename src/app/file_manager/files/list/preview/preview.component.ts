// login.component.ts
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileManagerAuthApiService } from 'src/app/api/auth/authApi';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { MoWbDetectionComponent } from 'src/app/components/detection.component';

@Component({
  selector: 'file-manager-list-details-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class FileManagerListDetailsPreviewComponents extends MoWbDetectionComponent {

  loaded: boolean;

  @Input() src: string;
  @Output() onClose = new EventEmitter<any>;

  constructor(
    public override _changeDetection: ChangeDetectorRef,
    private _toast: ToastTranslateService,
    private authApiService: FileManagerAuthApiService,
    private sanitizer: DomSanitizer
  ) {
    super(_changeDetection);
  }

  override ngOnInit(): void {
  }

  handleOnLoadedIframe(e: any){
    this.loaded = true;
  }

  handleOnClickOverlay(a: MouseEvent){
    this.onClose.emit();
  }

}
