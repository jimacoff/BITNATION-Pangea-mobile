// @flow
import _ from "lodash";

import {
  type Action,
  type NationTab,
  SWITCH_NATIONS_TAB,
  OPEN_NATION,
  DONE_FETCH_NATIONS,
  CANCEL_LOADING,
  NATIONS_FETCH_STARTED,
  REQUEST_JOIN_NATION,
  REQUEST_LEAVE_NATION,
  NATIONS_UPDATED
} from "./nations-actions";
import type {
  NationType,
  NationIdType,
  EditingNationType
} from "./nation-types";
import { resolveNation } from "./nations-utils";
import { SERVICES_DESTROYED } from "pangea-common/serviceContainer-actions";
  
export type State = {
  +nations: Array<NationType>,
  +myNationIds: Array<NationIdType>,
  +searchString: string | null,
  +selectedTab: NationTab,
  +openedNationId: NationIdType | null,
  +creatingNation: EditingNationType | null,
  +inProgress: boolean,
  +groupNationId: string | null,
};

export const initialState: State = {
  nations: [],
  myNationIds: [],
  searchString: null,
  selectedTab: "ALL_NATIONS",
  openedNationId: null,
  groupNationId: null,
  creatingNation: null,
  inProgress: false
};

/**
 * @desc Nations reducer.
 * @param {State} state Current state.
 * @param {Action} action Performed action.
 * @returns {State} Next state.
 */
export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SERVICES_DESTROYED:
      return initialState;
    case SWITCH_NATIONS_TAB:
      return {
        ...state,
        selectedTab: action.tab
      };
    case OPEN_NATION:
      return {
        ...state,
        openedNationId: action.nationId
      };
    case NATIONS_FETCH_STARTED:
      return {
        ...state,
        inProgress: true
      };
    case NATIONS_UPDATED: {
      const myNationIds = _(action.nations)
        .filter(nation => nation.joined)
        .map(nation => nation.id)
        .value();
      let groupNationId = null;
      _.forEach(action.nations, (nation) => {
        if (nation.nationName === "BITNATION") {
          groupNationId = nation.id;
        }
      })
      return {
        ...state,
        nations: action.nations,
        myNationIds,
        groupNationId
      };
    }
    case DONE_FETCH_NATIONS:
      return {
        ...state,
        inProgress: false
      };
    case REQUEST_JOIN_NATION:
      return {
        ...state,
        inProgress: true
      };
    case REQUEST_LEAVE_NATION:
      return {
        ...state,
        inProgress: true
      };
    case CANCEL_LOADING:
      return {
        ...state,
        inProgress: false
      };
    default:
      return state;
  }
};

export const openedNation = (state: State): NationType | null => {
  if (state.openedNationId !== null) {
    return resolveNation(state.nations, state.openedNationId);
  }
  return null;
};
