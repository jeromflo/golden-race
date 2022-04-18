import { IBallsSelected } from './../../interfaces/ballsSelected';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css']
})
export class BetSlipComponent implements OnInit {
  public ballsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public coloursButtons: string[] = [];
  public selectedBalls: number[] = [];
  public readonly TOTALAMOUN: number = 500;
  public amount: number = 0;
  public multipliquerProfit: number = 1.5;
  public MINIMUNBET: number = 5;
  public formData: FormGroup;
  constructor(private store: Store<{ ballsSelected: IBallsSelected }>
    , private fb: FormBuilder
  ) {
    this.store.select('ballsSelected').subscribe((ballsSelected: IBallsSelected) => {
      this.coloursButtons = ballsSelected.coloursButtons;
      this.selectedBalls = ballsSelected.selectedBalls;

    })
    this.formData = this.fb.group({
      amount: [this.MINIMUNBET, [Validators.required, Validators.min(this.MINIMUNBET)]]

    })



  }
  ngOnInit(): void {
  }
  getColor(i: number) {

    return `btn btn-${this.coloursButtons[i]} rounded-circle mx-2`;
  }
}
