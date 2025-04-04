import {store} from '../store/store.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
