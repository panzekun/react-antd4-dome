let initState = {
  loginState: false, // 默认用户登录状态为false
  userName:'jack'
}

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_LOGIN_STATE':
      return { ...state, loginState: action.payload,userName:'sfs' }

    default:
      return state
  }
}

