// export default interface Product {
//   name: string,
//   description: string,
//   imagePath: any
// }

export default class Product {
  name: string
  description: string
  imagePath: any

  constructor(name: string, description: string, imagePath: any) {
    this.name = name
    this.description = description
    this.imagePath = imagePath
  }
}