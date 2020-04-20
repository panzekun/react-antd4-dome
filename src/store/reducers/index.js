//1.2 创建rootReducer
// 引入combineReducers方法，用于合并多个reducer成为一个rootReducer
import { combineReducers } from 'redux'

import { userReducer } from './userReducer'

let rootReducer = combineReducers({
  userModule: userReducer
})

export default rootReducer