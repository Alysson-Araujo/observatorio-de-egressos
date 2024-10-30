import cookie from 'js-cookie';

export function verifyAuth() {
  const auth = cookie.get('auth');
  if(auth) {
    return true;
  }
  else{
    return false;
  }
}