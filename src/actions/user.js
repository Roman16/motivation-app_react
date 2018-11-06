import http from './request';


export const LoginUser = user => {
   return http('post', 'Account/login', user);
};

export const LogoutUser = () => {
   return  console.log('log out');
};
