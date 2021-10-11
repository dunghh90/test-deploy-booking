export function loginAction(params) {
  console.log("🚀 ~ file: user.action.js ~ line 2 ~ loginAction ~ params", params)
  return {
    type: 'LOGIN_REQUEST',
    payload: params,
  }
}

export function registerAction(params) {
  return {
    type: 'REGISTER_REQUEST',
    payload: params,
  }
}

export function logoutAction(params) {
  return {
    type: 'LOGOUT_REQUEST',
    payload: params,
  }
}

export function getUserInfoAction(params) {
  return {
    type: 'GET_USER_INFO_REQUEST',
    payload: params,
  }
}
export function updateProfileAction(params) {
  return {
    type: 'UPDATE_PROFILE_REQUEST',
    payload: params,
  }
}
