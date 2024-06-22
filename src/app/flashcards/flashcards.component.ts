import {Component, OnDestroy, OnInit} from '@angular/core';
import {Card} from "./models/Card";
import {FlashcardsService} from "./flashcards.service";
import {concatMap, delay, finalize, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit, OnDestroy {
  card: Card | null = null;
  totalCards = 0
  similarCardsLength = 0
  loading = false;

  subscription: Subscription = new Subscription();

  constructor(private flashCardsService: FlashcardsService) {}

  ngOnInit(): void {
    this.loading = true
    this.flashCardsService.fetchFlashcards().pipe(
      concatMap(() => this.flashCardsService.getCard()),
      tap(() => {
        this.totalCards = this.flashCardsService.totalCards
        this.similarCardsLength = this.flashCardsService.similarCardsLength
      })
    ).subscribe(
        {
          next: card => {
            this.card = card
            this.loading = false
          },
          error: error => {
            console.log(error)
            this.loading = false
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
