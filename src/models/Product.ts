interface ICoordinate {
  latitude: number;
  longitude: number;
}

class Product {
  id: number;
  name: string;
  description: string;
  imagePath: any;
  location: ICoordinate;
  phone: string;

  constructor(id: number, name: string, description: string, imagePath: any, location: ICoordinate, phone: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.location = location;
    this.phone = phone;
  }
}

export { Product };