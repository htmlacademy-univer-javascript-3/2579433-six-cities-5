import { configureStore } from '@reduxjs/toolkit';
import {State, AppDispatch} from '../types/state';
import { rootReducer } from './reducers/root-reducer';
import { createAPI } from '../service/api';
import { redirect } from './middleware';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const api = createAPI();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api},
      },
    }).concat(redirect),
});
