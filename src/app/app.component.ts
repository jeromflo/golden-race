import * as actions from './components/redux/actions/ballsSelected.actions';
import { IApplication } from './interfaces/ballsSelected';
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
  public multiplerProfit: number = 1.5;
  public MINIMUNBET: number = 5;
  public ballsSelected: IApplication | null = null;
  public resultWins = -1;
  constructor(private store: Store<{ ballsSelected: IApplication }>) {

    this.ballsNumber.forEach(ballNumber => {
      let random = Math.floor((Math.random() * this.colours.length));

      this.coloursButtons.push(this.colours[random]);
    })
    this.store.select('ballsSelected').subscribe((el: IApplication) => {
      this.ballsSelected = el;
    })

    this.store.dispatch(actions.setColours({ value: this.coloursButtons }))
  }
  ngOnDestroy() {

  }
  pay() {
    let random = Math.floor(Math.random() * this.ballsNumber.length)
    let total = this.ballsSelected!.amountPay;
    if (this.ballsSelected?.selectedBalls.includes(random)) {
      console.log((this.ballsSelected!.amountPay / this.ballsSelected!.selectedBalls.length) * this.multiplerProfit);
      this.store.dispatch(actions.setRandom({ value: random }))
      total -= (this.ballsSelected!.amountPay / this.ballsSelected!.selectedBalls.length) * this.multiplerProfit;
    }
    this.store.dispatch(actions.addAmountUsed({ value: total }))
  }
  getTotal() {
    return this.ballsSelected?.amountPay;
  }
  title = 'golden_race';
}
