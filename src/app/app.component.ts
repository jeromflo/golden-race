import * as actions from './components/redux/actions/ballsSelected.actions';
import { IBallsSelected } from './interfaces/ballsSelected';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public ballsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public colours = ['primary', 'success', 'danger', 'warning', 'info']
  public coloursButtons: string[] = [];
  public readonly TOTALAMOUN: number = 500;
  public amount: number = 0;
  public multipliquerProfit: number = 1.5;
  public MINIMUNBET: number = 5;
  constructor(private store: Store<{ ballsSelected: IBallsSelected }>) {
    this.ballsNumber.forEach(ballNumber => {
      let random = Math.floor((Math.random() * this.colours.length));

      this.coloursButtons.push(this.colours[random]);
    })
    this.store.dispatch(actions.setColours({ value: this.coloursButtons }))
  }
  ngOnDestroy() {

  }
  title = 'golden_race';
}
