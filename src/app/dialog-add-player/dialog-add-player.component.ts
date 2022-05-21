import { Component, NgModule, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'],
  imports: [MatInputModule]
})



export class DialogAddPlayerComponent implements OnInit {
  name:string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
