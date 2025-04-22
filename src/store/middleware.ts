import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../service/browser-history';
import {Middleware} from 'redux';
import { rootReducer } from './reducers/root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'REDIRECT_TO') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
