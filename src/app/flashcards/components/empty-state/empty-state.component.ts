import { Component } from '@angular/core';
import {FlashcardsService} from "../../flashcards.service";

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {

  constructor(private flashCardsService: FlashcardsService) {}

  onResetCards(){
    this.flashCardsService.restartCards()
  }

}
