import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IApplication } from './interfaces/ballsSelected';
import { BetSlipComponent } from './components/bet-slip/bet-slip.component';
import * as actions from './components/redux/actions/ballsSelected.actions';
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { reducerBallsSelected } from './components/redux/reducers/ballsSelected.reducer';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, StoreModule.forRoot({ ballsSelected: reducerBallsSelected }),
        FormsModule, ReactiveFormsModule
      ],
      declarations: [
        AppComponent, BetSlipComponent
      ], providers: [Store]

    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnDestroy()
    expect(component).toBeTruthy();
  });
  it('pay() with wins ', () => {

    let store = TestBed.inject(Store);
    for (let i = 1; i < 11; i++) {
      store.dispatch(actions.setBall({ value: i }))
    }
    store.dispatch(actions.setAmountPay({ value: 100 }))
    component.pay();
    let randomWins = -1;
    let amountUsed = 0;
    let amountPay = 0;

    store.select('ballsSelected').subscribe((el: IApplication) => {
      console.log(el);
      amountUsed = el.amountUsed;
      amountPay = el.amountPay;
      randomWins = el.randomWins;
    })
    expect(randomWins).toBeGreaterThan(-1);
  });
  it('pay() with wins and pay less  ', () => {

    let store = TestBed.inject(Store);
    for (let i = 1; i < 11; i++) {
      store.dispatch(actions.setBall({ value: i }))
    }
    store.dispatch(actions.setAmountPay({ value: 100 }))
    component.pay();
    let randomWins = -1;
    let amountUsed = 0;
    let amountPay = 0;

    store.select('ballsSelected').subscribe((el: IApplication) => {
      console.log(el);
      amountUsed = el.amountUsed;
      amountPay = el.amountPay;
      randomWins = el.randomWins;
    })
    expect(amountUsed).toBeLessThan(amountPay);
  });
  it('getTotal()   ', () => {

    let store = TestBed.inject(Store);

    store.dispatch(actions.setAmountPay({ value: 100 }))
    let amountPay = 0;

    store.select('ballsSelected').subscribe((el: IApplication) => {
      console.log(el);
      amountPay = el.amountPay;
    })
    expect(amountPay).toBe(100);
  });

  it('pay() no wins ', () => {

    let store = TestBed.inject(Store);
    /*   for (let i = 1; i < 11; i++) {
        store.dispatch(actions.setBall({ value: i }))
      } */
    store.dispatch(actions.setAmountPay({ value: 100 }))
    component.pay();
    let randomWins = -1;
    let amountUsed = 0;
    let amountPay = 0;

    store.select('ballsSelected').subscribe((el: IApplication) => {
      console.log(el);
      amountUsed = el.amountUsed;
      amountPay = el.amountPay;
      randomWins = el.randomWins;
    })
    expect(randomWins).toBe(-1);
  });
});
