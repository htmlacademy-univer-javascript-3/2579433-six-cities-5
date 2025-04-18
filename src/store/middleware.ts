import {PayloadAction} from '@reduxjs/toolkit';
import browserHistory from '../service/browser-history';
import {Middleware} from 'redux';
import reducer from './reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'REDIRECT_TO') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
