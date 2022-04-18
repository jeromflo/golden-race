import * as actions from './../redux/actions/ballsSelected.actions';
import { IBallsSelected } from './../../interfaces/ballsSelected';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.css']
})
export class BallSelectorComponent implements OnInit, OnDestroy {
  @Input() ballsNumber: number[] = [];
  @Input() colours: string[] = []
  public coloursButtons: string[] = [];
  public selectedBalls: number[] = [];

  constructor(private store: Store<{ ballsSelected: IBallsSelected }>) {
    this.store.select('ballsSelected').subscribe((ballsSelected: IBallsSelected) => {
      console.log(ballsSelected);

      this.selectedBalls = ballsSelected.selectedBalls;
      this.coloursButtons = ballsSelected.coloursButtons;
    })



  }

  ngOnInit(): void {

  }
  ngOnDestroy() {

  }
  selectedBall(ballNumber: number) {
    this.store.dispatch(actions.setBall({ value: ballNumber }))
  }
  isDisabled(ballNumber: number) {
    return this.selectedBalls.includes(ballNumber) ? true : null;
  }
  getColor(i: number) {

    return `btn btn-${this.coloursButtons[i]} rounded-circle mx-2`;
  }
}
