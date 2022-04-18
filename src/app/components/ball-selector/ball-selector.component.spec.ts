import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallSelectorComponent } from './ball-selector.component';
import { reducerBallsSelected } from '../redux/reducers/ballsSelected.reducer';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BallSelectorComponent],
      imports: [StoreModule.forRoot({ ballsSelected: reducerBallsSelected })
      ],
      providers: [Store]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
