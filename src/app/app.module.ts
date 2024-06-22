import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {provideHttpClient} from "@angular/common/http";
import {MarkdownModule} from "ngx-markdown";
import {FlashcardsRoutingModule} from "./flashcards/flashcards-routing.module";
import {FlashcardsModule} from "./flashcards/flashcards.module";
import { SpinnerComponent } from './shared/spinner/spinner.component';
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlashcardsRoutingModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    SharedModule,
    FlashcardsModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
