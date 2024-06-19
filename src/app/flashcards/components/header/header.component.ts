import {Component, Input} from '@angular/core';
import {FlashcardsService} from "../../flashcards.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() totalCards: number = 0;
  @Input() similarCardsLength: number = 0;

  constructor(private flashCardsService: FlashcardsService) {}

  onGetSimilarCard() {
    this.flashCardsService.getSimilarCard()
  }

  onGetRandomCard() {
    this.flashCardsService.getRandomCard()
  }

}
