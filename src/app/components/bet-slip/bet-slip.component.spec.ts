import { IApplication } from './../../interfaces/ballsSelected';
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSlipComponent } from './bet-slip.component';
import { reducerBallsSelected } from '../redux/reducers/ballsSelected.reducer';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as actions from '../redux/actions/ballsSelected.actions';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetSlipComponent], imports: [StoreModule.forRoot({ ballsSelected: reducerBallsSelected }), FormsModule, ReactiveFormsModule
      ],
      providers: [Store, FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnDestroy()
    expect(component).toBeTruthy();
  });
  it('submitData() more than 5 ', () => {
    let store = TestBed.inject(Store);
    store.dispatch(actions.setBall({ value: 2 }))
    let pay = 0;
    component.formData.get('amount')?.setValue(5);

    component.submitData();
    store.select('ballsSelected').subscribe((el: IApplication) => {

      pay = el.amountPay
    })
    expect(pay).toBeGreaterThan(0);
  });
  it('submitData() less or equal 5 ', () => {
    let store = TestBed.inject(Store);
    store.dispatch(actions.setBall({ value: 2 }))
    let pay = 0;
    component.formData.get('amount')?.setValue(4);

    component.submitData();
    store.select('ballsSelected').subscribe((el: IApplication) => {

      pay = el.amountPay
    })
    expect(pay).toBe(0);
  });
  it('getColor() have primary', () => {
    let store = TestBed.inject(Store);
    store.dispatch(actions.setColours({ value: ['primary'] }))
    let color = component.getColor(0);

    expect(color.includes('primary')).toBeTruthy();
  });
});
