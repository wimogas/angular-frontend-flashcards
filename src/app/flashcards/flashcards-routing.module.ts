import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlashcardsComponent} from "./flashcards.component";

const routes: Routes = [{
  path: 'flashcards',
  component: FlashcardsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardsRoutingModule { }
