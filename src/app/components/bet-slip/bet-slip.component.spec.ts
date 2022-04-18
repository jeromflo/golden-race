import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSlipComponent } from './bet-slip.component';
import { reducerBallsSelected } from '../redux/reducers/ballsSelected.reducer';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    expect(component).toBeTruthy();
  });
});
