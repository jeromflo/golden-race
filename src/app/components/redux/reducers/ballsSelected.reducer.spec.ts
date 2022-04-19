import { IApplication } from '../../../interfaces/ballsSelected';

import * as actions from '../actions/ballsSelected.actions';
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { reducerBallsSelected } from './ballsSelected.reducer';

describe('BallsSelected Reducer', () => {
    let store: Store<{ ballsSelected: IApplication }>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, StoreModule.forRoot({ ballsSelected: reducerBallsSelected }),
            ],
            declarations: [
            ], providers: [Store]

        }).compileComponents();
    });
    beforeEach(() => {
        store = TestBed.inject(Store);
    });

    it('should create the app', () => {

        expect(store).toBeTruthy();
    });
    it('setBall', () => {
        store.dispatch(actions.setBall({ value: 2 }))
        store.select('ballsSelected').subscribe((el: IApplication) => {
            expect(el.selectedBalls.includes(2)).toBeTruthy();
        })
    });

    it('setColours', () => {
        store.dispatch(actions.setColours({ value: ['primary'] }))
        store.select('ballsSelected').subscribe((el: IApplication) => {
            expect(el.coloursButtons.includes('primary')).toBeTruthy();
        })
    });

    it('setAmountPay less than 5 ', () => {
        store.dispatch(actions.setBall({ value: 2 }))
        store.dispatch(actions.setAmountPay({ value: 2 }))
        store.select('ballsSelected').subscribe((el: IApplication) => {

            expect(el.amountPay).toBe(0);
        })
    });
    it('setAmountPay greather or equals than 5 ', () => {
        store.dispatch(actions.setBall({ value: 2 }))
        store.dispatch(actions.setAmountPay({ value: 5 }))
        store.select('ballsSelected').subscribe((el: IApplication) => {
            expect(el.amountPay).toBe(5);
        })
    });

    it('addAmountUsed', () => {
        store.dispatch(actions.addAmountUsed({ value: 100 }))
        store.select('ballsSelected').subscribe((el: IApplication) => {
            expect(el.amountUsed).toBe(100);
        })
    });
    it('setRandom', () => {
        store.dispatch(actions.setRandom({ value: 1 }))
        store.select('ballsSelected').subscribe((el: IApplication) => {
            expect(el.randomWins).toBe(1);
        })
    });
    it('resetSelection', () => {
        const initialValue: IApplication = {
            selectedBalls: [],
            coloursButtons: [],
            amountPay: 0,
            amountUsed: 0,
            MAXUSED: 500,
            MINUSED: 5,
            randomWins: -1
        }
        store.dispatch(actions.resetSelection())
        store.select('ballsSelected').subscribe((el: IApplication) => {
            let equals = JSON.stringify(el).includes(JSON.stringify(initialValue))
            expect(equals).toBeTruthy();
        })
    });


});
