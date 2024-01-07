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

@NgModule({
    declarations: [
        FileManagerDashboard,
        FileManagerComponents,
        FileManagerListComponents,
        FileManagerUsersComponents,
        FileManagerSettingsComponents,
        FileManagerSettingsAccountComponents
    ],
    exports: [
        FileManagerDashboard,
        FileManagerComponents,
        FileManagerListComponents,
        FileManagerUsersComponents,
        FileManagerSettingsComponents,
        FileManagerSettingsAccountComponents
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
        MoWbTooltipModule
    ]
})
  export class MoWbFileManagerModule { }
  