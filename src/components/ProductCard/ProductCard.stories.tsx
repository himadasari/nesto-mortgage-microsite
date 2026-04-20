import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';
import type { Product } from '../../types';

const mockProduct: Product = {
  id: 1,
  name: '5-Year Fixed',
  family: 'STANDARD',
  type: 'FIXED',
  term: '5_YEAR',
  insurable: true,
  insurance: 'INSURED',
  prepaymentOption: 'STANDARD',
  restrictionsOption: 'NO_RESTRICTIONS',
  restrictions: 'None',
  fixedPenaltySpread: 'Standard',
  helocOption: 'HELOC_WITHOUT',
  helocDelta: 0,
  lenderName: 'Nesto',
  lenderType: 'BANK',
  rateHold: '60_DAYS',
  rate: 4.89,
  ratePrimeVariance: 0,
  bestRate: 4.89,
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
};

const meta = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: mockProduct,
    onClick: () => {},
  },
};

export const VariableRate: Story = {
  args: {
    product: {
      ...mockProduct,
      id: 2,
      name: 'Variable Rate',
      type: 'VARIABLE',
      rate: 5.12,
      bestRate: 5.12,
    },
    onClick: () => {},
  },
};
