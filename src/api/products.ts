import type { Product } from '../types';
import { request } from './apiWrapper';

export const getProducts = (): Promise<Product[]> => request('/products');
