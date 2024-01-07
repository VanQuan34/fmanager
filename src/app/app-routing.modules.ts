// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FeatureComponent } from './feature/feature.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { MoWbLoginComponent } from './components/login/login.component';
import { FileManagerComponents } from './file_manager/file-manager.component';
import { FileManagerListComponents } from './file_manager/files/files.component';
import { FileManagerUsersComponents } from './file_manager/users/users.component';
import { FileManagerSettingsComponents } from './file_manager/settings/settings.component';

const routes: Routes = [
  { path: 'login', component: MoWbLoginComponent },
  { path: 'dashboard', component: FileManagerComponents, canActivate: [AuthGuard] },
  { path: 'files', component: FileManagerListComponents, canActivate: [AuthGuard] },
  { path: 'users', component: FileManagerUsersComponents, canActivate: [AuthGuard] },
  { path: 'settings', component: FileManagerSettingsComponents, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent } // Wildcard route for 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
