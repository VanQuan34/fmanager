import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MoWbComponentsModule } from 'src/app/components/components.module';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { FileManagerSidebarComponents } from './sidebar.component';

@NgModule({
    imports: [
      CommonModule,
      MoWbComponentsModule,
      TranslateModule.forChild({}),
    ],
    declarations: [
        FileManagerSidebarComponents
    ],
    exports: [
        FileManagerSidebarComponents
    ],
    providers: [
        ToastTranslateService
    ]
  })
  export class MoWbFileManagerSidebarModule { }
  