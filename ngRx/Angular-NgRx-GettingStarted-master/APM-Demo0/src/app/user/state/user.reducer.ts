import { createFeatureSelector, createSelector } from "@ngrx/store";

//This file is the reducer. The export function is

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_MASK_USER":
      console.log("existing state" + JSON.stringify(state));
      console.log("payload:" + action.payload);
      return {
        ...state, //we have this cause we want to copy what we have (that is not showProductCode)
        showUsername: action.payload
      };
    default:
      return state;
  }
}

export interface UserState {
  showUsername: boolean;
  user: any; //type UserState?
}

const initialState: UserState = {
  showUsername: true,
  user: null
};

const getUsersFeatureState = createFeatureSelector<UserState>("user");

export const getShowUsername = createSelector(
  getUsersFeatureState,
  state => state.showUsername
);