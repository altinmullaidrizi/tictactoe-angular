import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] | any;
  xIsNext: boolean;
  winner: string | any;

  constructor() {
    this.xIsNext = true;
  }

  ngOnInit(): void {
    this.newGame();
  }

  // tslint:disable-next-line:typedef
  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
  }

  // tslint:disable-next-line:typedef
  get player() {
    return this.xIsNext ? 'X' : 'O';
  }
  // tslint:disable-next-line:typedef
  makeMove(idx: number){
    if (!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
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
    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      if (this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]){
        return this.squares[a];
      }
    }
    return null;
  }
}
