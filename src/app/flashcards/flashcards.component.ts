import {Component, OnInit} from '@angular/core';
import {Card} from "./models/Card";
import {FlashcardsService} from "./flashcards.service";
import {concatMap, Subscription} from "rxjs";

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit {
  card: Card | null = null;
  totalCards = 0
  similarCardsLength = 0

  subscription: Subscription = new Subscription();

  constructor(private flashCardsService: FlashcardsService) {}

  ngOnInit(): void {
    this.flashCardsService.fetchFlashcards().pipe(
      concatMap(() => this.flashCardsService.getCard())
    ).subscribe(
        {
          next: card => {
            this.card = card;
            this.totalCards = this.flashCardsService.totalCards
            this.similarCardsLength = this.flashCardsService.similarCardsLength
          }
        }
      )
  }

  onResetCards(){
    this.flashCardsService.restartCards()
  }
}
