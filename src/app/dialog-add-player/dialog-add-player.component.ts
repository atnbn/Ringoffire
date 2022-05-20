import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']

})
export class DialogAddPlayerComponent implements OnInit {
  name:string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
