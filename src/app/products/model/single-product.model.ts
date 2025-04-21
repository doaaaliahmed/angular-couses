export interface ISingleProduct {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating?: IProductRate;
}

export interface IProductRate {
  rate: number;
  count: number;
}


export interface ICreateProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
