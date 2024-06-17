import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SButtonModule } from './shared/components/s-button/s-button.module';
import { RequestsModule } from '@core';
import { DonatersService, SheduleService } from '@app-services';

@NgModule({
  declarations: [AppComponent, MainComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    SButtonModule,
    RequestsModule,
  ],
  providers: [SheduleService, DonatersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
