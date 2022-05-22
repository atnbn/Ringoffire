import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';



const routes: Routes = [

  { path: '', component: StartScreenComponent },
  { path: 'game', component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),MatInputModule,MatFormFieldModule],
  exports: [RouterModule,MatInputModule,MatFormFieldModule,MatIconModule,MatSelectModule ,MatDialogModule]
})
export class AppRoutingModule { }
