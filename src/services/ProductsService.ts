export interface IProductsService {
  getProducts(pageSize: number, pageOffset: number): Promise<Response>;
}

export class  ProductsService implements IProductsService {
  getProducts(pageSize: number, pageOffset: number): Promise<Response> {
    return fetch(`http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${pageOffset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}