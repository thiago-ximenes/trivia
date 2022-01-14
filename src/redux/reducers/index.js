import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import gameSettings from './gameSettings';

const rootReducer = combineReducers({
  player,
  token,
  gameSettings,
});

export default rootReducer;
