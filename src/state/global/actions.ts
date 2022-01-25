import { createAction } from '@reduxjs/toolkit';

export const updateLoading = createAction<boolean>('global/loading');
