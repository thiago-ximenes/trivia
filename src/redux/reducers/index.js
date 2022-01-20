import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import gameSettings from './gameSettings';
import ranking from './ranking';

const rootReducer = combineReducers({
  player,
  token,
  gameSettings,
  ranking,
});

export default rootReducer;
