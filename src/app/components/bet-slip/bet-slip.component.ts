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
  public coloursButtons: string[] = [];
  public selectedBalls: number[] = [];
  public amount: number = 0;
  public minimunBet: number = 5;
  public formData: FormGroup;
  private subscription: Subscription[] = [];

  constructor(private store: Store<{ ballsSelected: IApplication }>
    , private fb: FormBuilder
  ) {
    this.subscription[0] = this.store.select('ballsSelected').subscribe((ballsSelected: IApplication) => {
      this.coloursButtons = ballsSelected.coloursButtons;
      this.selectedBalls = ballsSelected.selectedBalls;
      this.amount = ballsSelected.amountPay;
      this.minimunBet = ballsSelected.MINUSED;
    })

    this.formData = this.fb.group({
      amount: [this.amount, [Validators.required, Validators.min(this.minimunBet)]]//NOTE [RULES-FCT-05-M]

    })



  }
  ngOnDestroy() {
    this.subscription.forEach(el => el.unsubscribe())
  }

  /**
   * funcion que disapra el cambio en el amountPay
   */
  submitData() {

    this.store.dispatch(actions.setAmountPay({ value: this.selectedBalls.length * parseInt(this.formData.get('amount')!.value) }))
  }
  /**
   * 
   * @param i  numero de la bola menos uno para coger el color
   * @returns string con la clase que le pertenece
   */
  getColor(i: number) {

    return `btn btn-${this.coloursButtons[i]} rounded-circle mx-2`;
  }
}
