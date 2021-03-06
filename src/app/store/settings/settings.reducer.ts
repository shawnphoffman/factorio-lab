import {
  DisplayRate,
  ResearchSpeed,
  Preset,
  InserterTarget,
  InserterCapacity,
} from '~/models';
import { StoreUtility } from '~/utilities';
import { AppActionType, AppAction } from '../app.actions';
import { SettingsAction, SettingsActionType } from './settings.actions';

export interface SettingsState {
  preset: Preset;
  baseId: string;
  disabledRecipes: string[];
  expensive: boolean;
  belt: string;
  fuel: string;
  flowRate: number;
  displayRate: DisplayRate;
  miningBonus: number;
  researchSpeed: ResearchSpeed;
  inserterTarget: InserterTarget;
  inserterCapacity: InserterCapacity;
}

export const initialSettingsState: SettingsState = {
  preset: Preset.Minimum,
  baseId: '1.1',
  disabledRecipes: null,
  expensive: false,
  belt: null,
  fuel: null,
  flowRate: 1500,
  displayRate: DisplayRate.PerMinute,
  miningBonus: 0,
  researchSpeed: ResearchSpeed.Speed6,
  inserterTarget: InserterTarget.ExpressTransportBelt,
  inserterCapacity: InserterCapacity.Capacity7,
};

export function settingsReducer(
  state: SettingsState = initialSettingsState,
  action: SettingsAction | AppAction
): SettingsState {
  switch (action.type) {
    case AppActionType.LOAD:
      return action.payload.settingsState
        ? { ...initialSettingsState, ...action.payload.settingsState }
        : initialSettingsState;
    case AppActionType.RESET:
      return initialSettingsState;
    case SettingsActionType.SET_PRESET:
      return { ...state, ...{ preset: action.payload } };
    case SettingsActionType.SET_BASE:
      return {
        ...state,
        ...{
          baseId: action.payload,
          modIds: null,
          belt: null,
          fuel: null,
          disabledRecipes: null,
        },
      };
    case SettingsActionType.SET_DISABLED_RECIPES:
      return {
        ...state,
        ...{
          disabledRecipes: StoreUtility.compareValues(action.payload),
        },
      };
    case SettingsActionType.SET_EXPENSIVE:
      return { ...state, ...{ expensive: action.payload } };
    case SettingsActionType.SET_BELT:
      return {
        ...state,
        ...{ belt: StoreUtility.compareValue(action.payload) },
      };
    case SettingsActionType.SET_FUEL:
      return {
        ...state,
        ...{ fuel: StoreUtility.compareValue(action.payload) },
      };
    case SettingsActionType.SET_FLOW_RATE:
      return { ...state, ...{ flowRate: action.payload } };
    case SettingsActionType.SET_DISPLAY_RATE:
      return { ...state, ...{ displayRate: action.payload } };
    case SettingsActionType.SET_MINING_BONUS:
      return { ...state, ...{ miningBonus: action.payload } };
    case SettingsActionType.SET_RESEARCH_SPEED:
      return { ...state, ...{ researchSpeed: action.payload } };
    case SettingsActionType.SET_INSERTER_TARGET:
      return { ...state, ...{ inserterTarget: action.payload } };
    case SettingsActionType.SET_INSERTER_CAPACITY:
      return { ...state, ...{ inserterCapacity: action.payload } };
    default:
      return state;
  }
}
