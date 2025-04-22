import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const navigateTo = createAction<string>('NAVIGATE_TO');

export const redirectTo = createAction<AppRoute>('REDIRECT_TO');
