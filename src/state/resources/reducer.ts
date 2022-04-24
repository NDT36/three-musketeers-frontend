import {
  fetchCategoryData,
  fetchSourceData,
  ICategory,
  setRecentlyCategoryId,
  setRecentlySourceId,
} from './actions';
import { createReducer } from '@reduxjs/toolkit';
import { IAssetSources } from 'pages/SourcePage';

export interface IResourceState {
  sources?: IAssetSources[];
  categories?: ICategory[];
  recentlySourceId?: string;
  recentlyCategoryId?: string;
}

export const initialState: IResourceState = {
  sources: undefined,
  categories: undefined,
  recentlySourceId: undefined,
  recentlyCategoryId: undefined,
};

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchSourceData, (state, { payload }) => {
      state.sources = [...payload];
    })
    .addCase(fetchCategoryData, (state, { payload }) => {
      state.categories = [...payload];
    })
    .addCase(setRecentlyCategoryId, (state, { payload }) => {
      state.recentlyCategoryId = payload;
    })
    .addCase(setRecentlySourceId, (state, { payload }) => {
      state.recentlySourceId = payload;
    })
);
