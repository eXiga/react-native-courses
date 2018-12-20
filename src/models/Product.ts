class Product {
  id: number;
  name: string;
  description: string;
  imagePath: any;

  constructor(id: number, name: string, description: string, imagePath: any) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}

export { Product }