import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  start_game= new Audio('assets/audio/start-game.mp3');
  take_card = new Audio('assets/audio/take-card.mp3');
  game: Game = new Game;
  gameId: string;
  gameOver = false;
  enoughPlayer : boolean;
  statusPlayer : boolean = true;

  constructor(private route: ActivatedRoute , private firestore: AngularFirestore, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame()
    this.route.params.subscribe((params) =>{
      // console.log(params['id']);
      this.gameId = params['id'];
      this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .valueChanges()
      .subscribe((game: any) => {
        // console.log('Game update' , game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCard = game.playedCard;
        this.game.players = game.players;
        this.game.player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })
  }
  newGame() {
    this.game = new Game;    // So kann man was in das Firebase json adden
    this.start_game.play()  
  }
  closePopup(){
    this.statusPlayer = true;
  }
  checkStatus(){
    if (this.game.players.length < 1) {
        this.statusPlayer = false;
    }
  }

  takeCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true;
    }else  if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.take_card.play();
      this.saveGame();
      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000)
    } 
    this.checkStatus() 
  }
  editPlayer(playerId: number){
    // console.log('edit player' , playerId)
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change : string) => {
      if(change){
        if(change == 'DELETE'){
          this.game.player_images.splice(playerId , 1);
          this.game.players.splice(playerId , 1)
        }else {
          this.game.player_images[playerId] = change;
        }
      this.saveGame();
   } });
}
openDialog(): void { // adding name into the array 
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);
  dialogRef.afterClosed().subscribe((name: string) => {
    // überprüfen ob name existiert und dann ob name größer als 0 ist
    if(name && name.length > 0){
      this.game.players.push(name);
      this.game.player_images.push('1.webp');
      this.saveGame();
    }
  });
}
  saveGame(){
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson())
  }
}


