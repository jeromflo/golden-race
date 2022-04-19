import { AppComponent } from './../../app.component';
import * as actions from './../redux/actions/ballsSelected.actions';
import { IApplication } from './../../interfaces/ballsSelected';
import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallSelectorComponent } from './ball-selector.component';
import { reducerBallsSelected } from '../redux/reducers/ballsSelected.reducer';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let componentAppComponent: AppComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;
  let fixtureAppComponent: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BallSelectorComponent, AppComponent],
      imports: [StoreModule.forRoot({ ballsSelected: reducerBallsSelected })
      ],
      providers: [Store]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    fixtureAppComponent = TestBed.createComponent(AppComponent);
    componentAppComponent = fixtureAppComponent.componentInstance;
    fixture.detectChanges();
  });

  it('isDisabled true', () => {
    component.selectedBall(2);
    expect(component.isDisabled(2)).toBeTruthy();
  });
  it('isDisabled false', () => {
    component.selectedBall(2);
    expect(component.isDisabled(1)).toBeFalsy();
  });
  it('selectedBall ', () => {
    let store = TestBed.inject(Store);
    let initialBalls: number[] = [];
    component.selectedBall(2);
    store.select('ballsSelected').subscribe((el: IApplication) => {
      initialBalls = el.selectedBalls;
    })
    expect(initialBalls).toContain(2);
  });
  it('getColor() have primary', () => {
    let store = TestBed.inject(Store);
    store.dispatch(actions.setColours({ value: ['primary'] }))
    let color = component.getColor(0);

    expect(color.includes('primary')).toBeTruthy();
  });
  it('selectedBall ', () => {
    let store = TestBed.inject(Store);
    let initialBalls: number[] = [];
    component.selectedBall(2);
    component.reset();
    store.select('ballsSelected').subscribe((el: IApplication) => {
      initialBalls = el.selectedBalls;
    })
    expect(initialBalls).not.toContain(2);
  });
  it('should create', () => {
    component.ngOnDestroy()
    expect(component).toBeTruthy();
  });
});
