import bignumber from 'bignumber.js';

export interface Product {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  price: bignumber;
}

