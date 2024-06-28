import { http } from './services';

export async function login(email: string, password: string): Promise<any> {
  try {
    const response = await http.post('/v1/auth/login', { email: email, password: password });
    return response;
  } catch (error) {
    return error;
  }
}
export async function getProfile() {
  const token = JSON.parse(localStorage.getItem('token')!);
  return await http.get('/v1/auth/profile', { headers: { Authorization: `Bearer ${token}` } });
}
export function logout() {
  localStorage.removeItem('token');
}
export function register() {}
export function isTokenExpired(token: any): boolean {
  const currentTime = Date.now().valueOf() / 1000;
  return token.exp < currentTime;
}
