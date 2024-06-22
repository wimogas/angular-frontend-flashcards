import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashcardsRoutingModule } from './flashcards-routing.module';
import { FlashcardsComponent } from './flashcards.component';
import {MarkdownModule} from "ngx-markdown";
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    FlashcardsComponent,
    HeaderComponent,
    CardComponent,
    EmptyStateComponent
  ],
  imports: [
    CommonModule,
    FlashcardsRoutingModule,
    MarkdownModule.forChild(),
    SharedModule,
  ]
})
export class FlashcardsModule { }
