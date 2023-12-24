import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MoWbComponentsModule } from 'src/app/components/components.module';
import { FileManagerDashboard } from './dashboard.component';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';

@NgModule({
    imports: [
      CommonModule,
      MoWbComponentsModule,
      TranslateModule.forChild({}),
    ],
    declarations: [
        FileManagerDashboard
    ],
    exports: [
        FileManagerDashboard,
    ],
    providers: [
        ToastTranslateService
    ]
  })
  export class MoWbFileManagerModule { }
  