import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import {State, AppDispatch} from '../types/state';
import { createAPI } from '../api/api';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const api = createAPI();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api},
      },
    }),
});
