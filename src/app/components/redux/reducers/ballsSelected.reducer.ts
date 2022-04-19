import { IApplication } from './../../../interfaces/ballsSelected';
import * as actions from './../actions/ballsSelected.actions';
import { createReducer, on } from '@ngrx/store';
const initialValue: IApplication = {
    selectedBalls: [],
    coloursButtons: [],
    amountPay: 0,
    amountUsed: 0,
    MAXUSED: 500,
    MINUSED: 5,
    randomWins: -1
}

const reducer = createReducer(initialValue,
    on(actions.setBall, (state: IApplication, { value }) => {
        let copy: IApplication = JSON.parse(JSON.stringify(state));
        copy.selectedBalls.push(value)
        return copy;
    }),
    on(actions.setColours, (state: IApplication, { value }) => {
        let copy: IApplication = JSON.parse(JSON.stringify(state));
        copy.coloursButtons = value;
        return copy;
    }),
    on(actions.setAmountPay, (state: IApplication, { value }) => {
        console.log(value);

        let copy: IApplication = JSON.parse(JSON.stringify(state));
        if (value >= initialValue.MINUSED && (value + initialValue.amountUsed) < initialValue.MAXUSED) {
            copy.amountPay = value;
        }
        return copy;
    }),
    on(actions.addAmountUsed, (state: IApplication, { value }) => {
        let copy: IApplication = JSON.parse(JSON.stringify(state));
        if (value > initialValue.MINUSED && (value + initialValue.amountUsed) < initialValue.MAXUSED) {
            copy.amountUsed += value;
        }
        return copy;
    }),
    on(actions.setRandom, (state: IApplication, { value }) => {
        let copy: IApplication = JSON.parse(JSON.stringify(state));
        copy.randomWins = value;

        return copy;
    }),
    on(actions.resetSelection, (state: IApplication) => {
        let copy: IApplication = JSON.parse(JSON.stringify(state));
        copy.selectedBalls = [];

        return copy;
    }),
)
export function reducerBallsSelected(state: any, actions: any): IApplication {
    return reducer(state, actions);
}