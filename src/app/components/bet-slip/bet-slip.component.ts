import { Subscription } from 'rxjs';
import * as actions from './../redux/actions/ballsSelected.actions';
import { IApplication } from './../../interfaces/ballsSelected';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.css']
})
export class BetSlipComponent implements OnDestroy {
  public ballsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public coloursButtons: string[] = [];
  public selectedBalls: number[] = [];
  public readonly TOTALAMOUN: number = 500;
  public amount: number = 0;
  public amountUsed: number = 0;
  public multipliquerProfit: number = 1.5;
  public MINIMUNBET: number = 5;
  public formData: FormGroup;
  private subscription: Subscription[] = [];

  constructor(private store: Store<{ ballsSelected: IApplication }>
    , private fb: FormBuilder
  ) {
    this.subscription[0] = this.store.select('ballsSelected').subscribe((ballsSelected: IApplication) => {
      this.coloursButtons = ballsSelected.coloursButtons;
      this.selectedBalls = ballsSelected.selectedBalls;
      this.amount = ballsSelected.amountPay;
      this.amountUsed = ballsSelected.amountUsed;
    })

    this.formData = this.fb.group({
      amount: [this.amount, [Validators.required, Validators.min(this.MINIMUNBET)]]//NOTE [RULES-FCT-05-M]

    })



  }
  ngOnDestroy() {
    this.subscription.forEach(el => el.unsubscribe())
  }

  submitData() {

    this.store.dispatch(actions.setAmountPay({ value: this.selectedBalls.length * parseInt(this.formData.get('amount')!.value) }))
  }
  getColor(i: number) {

    return `btn btn-${this.coloursButtons[i]} rounded-circle mx-2`;
  }
}
