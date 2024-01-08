// login.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';

@Component({
  selector: 'file-manager-nav-components',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class FileManagerNavComponents implements OnInit {

  isToggle: boolean;

  @Output() onClickToggle = new EventEmitter<boolean>;

  ngOnInit(): void {
  }

  handleOnClickToggleMenu(e: MouseEvent){
    this.isToggle = !this.isToggle;
    this.onClickToggle.emit(this.isToggle);
    console.log('this.isToggle=', this.isToggle);
  }

}
