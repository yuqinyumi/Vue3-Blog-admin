import request from '@/utils/request'

// export const userRegisterService = ({ username, password, repassword }) => {
//   return request.post('/ai/reg', { username, password, repassword })
// }

//简写：注册接口
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })

//获取用户基本信息
export const userGetInfoService = () => request.get('/my/userinfo')
