import cookie from 'js-cookie';

export function logout() {
  // Remova o token de autenticação ou qualquer outra informação de autenticação
  cookie.remove('auth');

  // Redirecione o usuário para a página de login ou qualquer outra página desejada
  window.location.href = '/login';
}

