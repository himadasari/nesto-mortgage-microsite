import type { Applicant, Product } from '../types';

export const getBestProducts = (products: Product[]) => {
  const variable = products.filter((p) => p.type === 'VARIABLE');
  const fixed = products.filter((p) => p.type === 'FIXED');

  const getLowest = (list: Product[]) => {
    if (!list.length) return [];

    const minRate = Math.min(...list.map((p) => p.bestRate));
    return list.filter((p) => p.bestRate === minRate);
  };

  return {
    variable: getLowest(variable),
    fixed: getLowest(fixed),
  };
};

export const isApplicantComplete = (a: Applicant): boolean => {
  return [a.firstName, a.lastName, a.email, a.phone].every((f) => f?.trim());
};
