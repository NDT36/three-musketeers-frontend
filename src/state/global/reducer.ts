import { updateLoading } from './actions';
import { createReducer } from '@reduxjs/toolkit';

export interface IGlobalState {
  loading: boolean;
}

export const initialState: IGlobalState = {
  loading: false,
};

export default createReducer(initialState, (builder) =>
  builder.addCase(updateLoading, (state, { payload }) => {
    state.loading = payload;
  })
);
