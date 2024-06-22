import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Card} from "./models/Card";
import {BehaviorSubject, delay, tap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlashcardsService {
  cards: Card[] = []
  viewedCards: Card[] = []
  similarCards: Card[] = []

  hasSimilarCards = true
  similarCardsLength = 0
  totalCards = 0
  randomIndex = 0

  cardSub = new BehaviorSubject<Card|null>(null);
  card = this.cardSub.asObservable()

  apiUrl = `${environment.firebaseDbUrl}flashcards.json`

  constructor(private http: HttpClient) {}

  fetchFlashcards() {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(
        data => {
          this.cards = [...data]
          this.viewedCards = [...data]
          this.totalCards = this.viewedCards.length
          this.cardSub.next(this.generateRandomCard())
        }
      ),
      delay(500)
    )
  }

  getCard() {
    return this.card
  }

  generateRandomCard() {
    if (this.viewedCards.length > 0) {
      this.randomIndex = this.generateRandomIndex(this.totalCards)
      return this.viewedCards[this.randomIndex]
    } else {
      return null
    }
  }

  getRandomCard() {
    this.similarCards = []
    this.similarCardsLength = 0
    this.cardSub.next(this.generateRandomCard())
    if (this.card) {
      this.viewedCards.splice(this.randomIndex, 1)
      this.totalCards = this.viewedCards.length
    }
  }

  getSimilarCard() {
    if( this.similarCards.length === 0) {
      this.similarCards = this.viewedCards.filter(c => c.tags.some(t =>
        this.cardSub.value!.tags.includes(t)
        && t !== "Angular"
      ) && c !== this.cardSub.value)
      if (this.similarCards.length === 0) {
        this.hasSimilarCards = false
        this.getRandomCard()
        return;
      } else {
        this.hasSimilarCards = true
      }
    }
    const randomIndex = this.generateRandomIndex(this.similarCardsLength)
    const newCard = this.similarCards[randomIndex]
    if (this.similarCards.length > 0) {
      this.similarCards.splice(randomIndex, 1)
    } else {
      this.similarCards = []
    }
    this.similarCardsLength = this.similarCards.length
    this.cardSub.next(newCard)
    this.viewedCards = this.viewedCards.filter(card => card.title !== this.cardSub.value!.title)
    this.totalCards = this.viewedCards.length
  }

  generateRandomIndex(length: number) {
    return Math.floor(Math.random() * length)
  }

  restartCards() {
    this.viewedCards = [...this.cards]
    this.totalCards = this.viewedCards.length
    this.getRandomCard()
  }
}
