import { createAction } from '@reduxjs/toolkit';
import { IAssetSources } from 'pages/SourcePage';

export interface ICategory {
  _id: string;
  name: string;
  avatar: string;
  createdBy: string;
  type: number;
  updateAt: number;
  createdAt: number;
  status: number;
}

export const fetchSourceData = createAction<IAssetSources[]>('resources/sources');
export const fetchCategoryData = createAction<ICategory[]>('resources/categories');
export const setRecentlySourceId = createAction<string>('resources/recentlySourceId');
export const setRecentlyCategoryId = createAction<string>('resources/recentlyCategoryId');
