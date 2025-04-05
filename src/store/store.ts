import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import {State, AppDispatch} from '../types/state';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
export const store = configureStore({reducer});
