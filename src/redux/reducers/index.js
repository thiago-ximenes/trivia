import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import gameSettings from './gameSettings';
import correctAnswersCount from './corrrectAnswersCount';

const rootReducer = combineReducers({
  player,
  token,
  gameSettings,
  correctAnswersCount,
});

export default rootReducer;
