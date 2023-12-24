// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.modules';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeatureComponent } from './feature/feature.component';
import { NotFoundComponent } from './not-found/not-found.component'; // Replace 'FeatureComponent' with your actual feature component
import { CommonModule } from '@angular/common';
import { MoWbComponentsModule } from './components/components.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LANGUAGE } from './common/language.define';
import { MoWbFileManagerModule } from './file_manager/dashborad/dashboard.modules';
import { ToastTranslateService } from './api/common/toast-translate.service';
import { MoWbCommonServiceModule } from './api/common/common-service.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent, LoginComponent, FeatureComponent, NotFoundComponent],
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      CommonModule,
      MoWbComponentsModule,
      MoWbFileManagerModule,
      HttpClientModule,
      MoWbCommonServiceModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        },
      }),
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _translate: TranslateService, private _router: Router, private _auth: AuthService,) {
    this._translate.addLangs([LANGUAGE.VI, LANGUAGE.EN]);
    let lang: string | null = localStorage.getItem(LANGUAGE.KEY_LANGUAGE_STORAGE);
    if (!lang) {
      const urlParams = new URLSearchParams(window.location.search);
      lang = urlParams.get('lang') ? urlParams.get('lang') : LANGUAGE.DEFAULT;
    }
    lang = lang || LANGUAGE.DEFAULT;
    console.log('lang=', lang);
    localStorage.setItem(LANGUAGE.KEY_LANGUAGE_STORAGE, lang);
    this._translate.setDefaultLang(lang);
  }
}