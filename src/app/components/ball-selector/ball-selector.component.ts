import * as actions from './../redux/actions/ballsSelected.actions';
import { IApplication } from './../../interfaces/ballsSelected';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.css']
})
export class BallSelectorComponent implements OnInit, OnDestroy {
  @Input() ballsNumber: number[] = [];
  @Input() colours: string[] = [];
  public result: number = -1;
  public coloursButtons: string[] = [];
  public selectedBalls: number[] = [];

  constructor(private store: Store<{ ballsSelected: IApplication }>) {
    this.store.select('ballsSelected').subscribe((ballsSelected: IApplication) => {
      console.log(ballsSelected);

      this.selectedBalls = ballsSelected.selectedBalls;
      this.coloursButtons = ballsSelected.coloursButtons;
      this.result = ballsSelected.randomWins;
    })



  }

  ngOnInit(): void {

  }
  ngOnDestroy() {

  }
  selectedBall(ballNumber: number) {//NOTE [RULES-FCT-02-M] 
    this.store.dispatch(actions.setBall({ value: ballNumber }))
  }
  isDisabled(ballNumber: number) {
    return this.selectedBalls.includes(ballNumber) ? true : null;
  }
  getColor(i: number) {

    return `btn btn-${this.coloursButtons[i]} rounded-circle mx-2 mb-2`;
  }
  reset() {
    this.store.dispatch(actions.resetSelection())
  }
}
