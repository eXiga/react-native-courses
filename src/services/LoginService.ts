export interface ILoginService {
  login(email: string, password: string): Promise<Response>;
}

export class LoginService implements ILoginService {
  login(email: string, password: string) {
    return fetch('http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });
  }
}