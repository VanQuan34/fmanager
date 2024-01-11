import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MoWbComponentsModule } from 'src/app/components/components.module';
import { FileManagerDashboard } from './dashboard/dashboard.component';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { FileManagerComponents } from './file-manager.component';
import { MoWbFileManagerSidebarModule } from './sidebar/sidebar.modules';
import { MoWbFileManagerTopbarModule } from './topbar/topbar.modules';
import { FileManagerListComponents } from './files/files.component';
import { FileManagerUsersComponents } from './users/users.component';
import { FileManagerSettingsComponents } from './settings/settings.component';
import { FileManagerSettingsAccountComponents } from './settings/account/account.component';
import { FileManagerSettingsAccountPipeModule } from './settings/account/account.pipe';
import { FileManagerAuthApiServiceModule } from '../api/auth/authApi.module';
import { MoWbCheckboxModule } from "../components/checkbox/checkbox.module";
import { MoWbTooltipModule } from "../components/tooltip/tooltip.module";
import { FileManagerNavComponents } from './nav/nav.component';
import { FileManagerSettingsSecurityComponents } from './settings/security/security.component';
import { ColorSketchModule } from 'ngx-color/sketch';

@NgModule({
    declarations: [
        FileManagerDashboard,
        FileManagerComponents,
        FileManagerListComponents,
        FileManagerUsersComponents,
        FileManagerSettingsComponents,
        FileManagerSettingsAccountComponents,
        FileManagerNavComponents,
        FileManagerSettingsSecurityComponents,
    ],
    exports: [
        FileManagerDashboard,
        FileManagerComponents,
        FileManagerListComponents,
        FileManagerUsersComponents,
        FileManagerSettingsComponents,
        FileManagerSettingsAccountComponents,
        FileManagerNavComponents,
        FileManagerSettingsSecurityComponents,
    ],
    providers: [
        ToastTranslateService
    ],
    imports: [
        CommonModule,
        MoWbComponentsModule,
        MoWbFileManagerSidebarModule,
        MoWbFileManagerTopbarModule,
        TranslateModule.forChild({}),
        FileManagerSettingsAccountPipeModule,
        FileManagerAuthApiServiceModule,
        MoWbCheckboxModule,
        MoWbTooltipModule,
        ColorSketchModule,
    ]
})
  export class MoWbFileManagerModule { }
  