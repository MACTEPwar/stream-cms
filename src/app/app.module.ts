import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SButtonModule } from './shared/components/s-button/s-button.module';
import { ConfigService, RequestsModule } from '@core';
import { DonatersService, SheduleService, AuthService } from '@app-services';
import { AuthHttpService } from './core/requests/auth-http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.inteceptor';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PersonalAreaComponent } from './views/personal-area/personal-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    PersonalAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    SButtonModule,
    HttpClientModule,
    RequestsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ConfigService,
    SheduleService,
    DonatersService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => {
        return () => configService.load().toPromise();
      },
      multi: true,
      deps: [ConfigService],
    },
    AuthService,
    AuthHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useFactory: (auth: AuthService) => {
        // console.log('FACTORY IN JWT');
        return new AuthInterceptor(auth);
      },
      deps: [AuthService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
