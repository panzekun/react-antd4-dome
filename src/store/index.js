// applyMiddleware方法用于使用中间件
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
const initialState = sessionStorage.getItem('store') ? JSON.parse(sessionStorage.getItem('store')) : {}
console.log(initialState);
// 1.1 利用createStore方法创建store容器对象
let store = createStore(rootReducer, initialState)
sessionStorage.removeItem('store')
export default store