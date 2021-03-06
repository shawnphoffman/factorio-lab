import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

import { OptionsComponent, ColumnsComponent } from '~/components';
import { LinkValue } from '~/models';
import { reducers, metaReducers, State } from '~/store';
import { SetLinkValueAction } from '~/store/preferences';
import { ListComponent, ListContainerComponent } from '../list-container';
import { SankeyComponent } from './sankey/sankey.component';
import { FlowContainerComponent } from './flow-container.component';

describe('FlowContainerComponent', () => {
  let component: FlowContainerComponent;
  let fixture: ComponentFixture<FlowContainerComponent>;
  let store: Store<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ColumnsComponent,
        OptionsComponent,
        SankeyComponent,
        ListComponent,
        ListContainerComponent,
        FlowContainerComponent,
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the selected node', () => {
    spyOn(component.ref, 'detectChanges');
    component.setSelected(null);
    expect(component.selected).toEqual(null);
    expect(component.ref.detectChanges).toHaveBeenCalled();
  });

  it('should set the link value', () => {
    component.setLinkValue(LinkValue.Belts);
    expect(store.dispatch).toHaveBeenCalledWith(
      new SetLinkValueAction(LinkValue.Belts)
    );
  });
});
