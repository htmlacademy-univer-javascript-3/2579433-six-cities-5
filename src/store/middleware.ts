import {Middleware, Dispatch, AnyAction} from '@reduxjs/toolkit';
import {navigateTo} from './action';
import {History} from 'history';
import {State} from '../types/state';

export const redirectMiddleware = (history: History): Middleware<object, State> =>
  () =>
    (next: Dispatch<AnyAction>) =>
      (action: AnyAction) => {
        if (navigateTo.match(action)) {
          history.push(action.payload);
        }

        return next(action);
      };
