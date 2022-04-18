import { IBallsSelected } from './../../../interfaces/ballsSelected';
import * as actions from './../actions/ballsSelected.actions';
import { createReducer, on } from '@ngrx/store';
const initialValue: IBallsSelected = {
    selectedBalls: [],
    coloursButtons: []
}

const reducer = createReducer(initialValue,
    on(actions.setBall, (state: IBallsSelected, { value }) => {
        let copy: IBallsSelected = JSON.parse(JSON.stringify(state));
        copy.selectedBalls.push(value)
        return copy;
    }),
    on(actions.setColours, (state: IBallsSelected, { value }) => {
        let copy: IBallsSelected = JSON.parse(JSON.stringify(state));
        copy.coloursButtons = value;
        return copy;
    }),
)
export function reducerBallsSelected(state: any, actions: any): IBallsSelected {
    return reducer(state, actions);
}