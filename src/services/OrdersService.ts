export interface IProductsService {
  createCart(token: string): Promise<Response>;
}

export class  ProductsService implements IProductsService {
  createCart(token: string): Promise<Response> {
    return fetch('http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
       'Authorization': 'Bearer' + token 
      }
    });
  }
}