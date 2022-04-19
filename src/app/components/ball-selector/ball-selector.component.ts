import { Subscription } from 'rxjs';
import * as actions from './../redux/actions/ballsSelected.actions';
import { IApplication } from './../../interfaces/ballsSelected';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.css']
})
export class BallSelectorComponent implements OnDestroy {
  @Input() ballsNumber: number[] = [];
  @Input() colours: string[] = [];
  public result: number = -1;
  public coloursButtons: string[] = [];
  public selectedBalls: number[] = [];
  private subscription: Subscription[] = [];

  constructor(private store: Store<{ ballsSelected: IApplication }>) {
    this.subscription[0] = this.store.select('ballsSelected').subscribe((ballsSelected: IApplication) => {
      this.selectedBalls = ballsSelected.selectedBalls;
      this.coloursButtons = ballsSelected.coloursButtons;
      this.result = ballsSelected.randomWins;
    })



  }

  ngOnDestroy() {
    this.subscription.forEach(el => el.unsubscribe())
  }
  /**
   * funcion que dispara la bola seleccionada
   * @param ballNumber numero de la bola seleccionado 
   * 
   */
  selectedBall(ballNumber: number) {//NOTE [RULES-FCT-02-M] 
    this.store.dispatch(actions.setBall({ value: ballNumber }))
  }
  /**
   * 
   * @param ballNumber bola actual a comprobar si es seleccionada
   * @returns true si esta en el array de bolas seleccionadas o null en caso contrario
   */
  isDisabled(ballNumber: number) {
    return this.selectedBalls.includes(ballNumber) ? true : null;
  }
  /**
   * 
   * @param i numero de la bola -1 o la posicion en el array de numeros
   * @returns  string con la clase que le pertenezca
   */
  getColor(i: number) {

    return `btn btn-${this.coloursButtons[i]} rounded-circle mx-2 mb-2`;
  }
  /**
   * funcion que resetea el formulario 
   */
  reset() {
    this.store.dispatch(actions.resetSelection())
  }
}
