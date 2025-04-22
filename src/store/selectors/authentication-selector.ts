import {APIScenarios, AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import { UserData } from '../../types/userdata';

export const getUserData = (state: State): UserData | null => state[APIScenarios.Auth].userData;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[APIScenarios.Auth].authorizationStatus;
