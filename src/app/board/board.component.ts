import {Component, OnInit} from '@angular/core';
import set = Reflect.set;
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] | any;
  xIsNext: boolean;
  winner: string | any;
  players: string | any;
  counter: number;

  constructor(private route: ActivatedRoute) {
    this.xIsNext = true;
    this.players = 'single';
    this.counter = 0;
  }

  ngOnInit(): void {
    this.newGame();
    this.route.queryParamMap.subscribe(params => this.players = params.get('players'));
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
  }

  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number): void {
    if (this.players === 'single') {
      if (this.xIsNext) {
        if (!this.squares[idx]) {
          this.squares.splice(idx, 1, this.player);
          this.xIsNext = !this.xIsNext;
          this.counter++;
        }
      }
      this.winner = this.calculateWinner();
      setTimeout(() => {
        if (this.counter < 8) {
          this.computerMove();
        }
      }, 200);
    } else {
      if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
        this.counter++;
      }
      this.winner = this.calculateWinner();
    }
    if (this.counter === 9 && this.winner === null) {
      this.winner = 'none. You\'re even!';
    }
  }

  computerMove(): void {
    // Checks Rows if two squares are Xs
    for (let i = 0; i <= 6; i = i + 3) {
      if (this.squares[i] !== null && this.squares[i] === this.squares[i + 1] && this.squares[i + 2] === null) {
        this.computerPosMove(i + 2);
        return;
      } else if (this.squares[i] !== null && this.squares[i] === this.squares[i + 2]  && this.squares[i + 1] === null) {
        this.computerPosMove(i + 1);
        return;
      } else if (this.squares[i + 1] !== null && this.squares[i + 1] === this.squares[i + 2]  && this.squares[i] === null) {
        this.computerPosMove(i);
        return;
      }
    }
    // Checks Columns if two squares are Xs
    for (let i = 0; i <= 2; i++) {
      if (this.squares[i] !== null && this.squares[i] === this.squares[i + 3]  && this.squares[i + 6] === null) {
        this.computerPosMove(i + 6);
        return;
      } else if (this.squares[i] !== null && this.squares[i] === this.squares[i + 6]  && this.squares[i + 3] === null) {
        this.computerPosMove(i + 3);
        return;
      } else if (this.squares[i + 3] !== null && this.squares[i + 3] === this.squares[i + 6]  && this.squares[i] === null) {
        this.computerPosMove(i);
        return;
      }
    }
    this.computerRandomMove();
  }

  computerPosMove(pos: number): void {
    this.squares.splice(pos, 1, this.player);
    this.xIsNext = !this.xIsNext;
    this.counter++;
    this.winner = this.calculateWinner();
  }

  computerRandomMove(): void {
    const randomSq: number = Math.floor(Math.random() * 9);
    if (this.squares[randomSq] === null) {
      this.computerPosMove(randomSq);
    } else {
      this.computerMove();
    }
  }

  calculateWinner(): any {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return null;
  }
}
