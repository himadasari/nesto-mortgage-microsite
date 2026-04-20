import { getBestProducts, isApplicantComplete } from '../../utils/utils';
import type { Applicant, Product } from '../../types';

const mockProducts: Product[] = [
  {
    id: 1,
    type: 'VARIABLE',
    bestRate: 5.2,
    name: '',
    family: 'VALUE_FLEX',
    term: '1_YEAR',
    insurable: false,
    insurance: 'INSURED',
    prepaymentOption: 'STANDARD',
    restrictionsOption: 'NO_RESTRICTIONS',
    restrictions: '',
    fixedPenaltySpread: '',
    helocOption: 'HELOC_WITH',
    helocDelta: 0,
    lenderName: '',
    lenderType: '',
    rateHold: '30_DAYS',
    rate: 0,
    ratePrimeVariance: 0,
    created: '',
    updated: '',
  },
  {
    id: 2,
    type: 'VARIABLE',
    bestRate: 4.8,
    name: '',
    family: 'VALUE_FLEX',
    term: '1_YEAR',
    insurable: false,
    insurance: 'INSURED',
    prepaymentOption: 'STANDARD',
    restrictionsOption: 'NO_RESTRICTIONS',
    restrictions: '',
    fixedPenaltySpread: '',
    helocOption: 'HELOC_WITH',
    helocDelta: 0,
    lenderName: '',
    lenderType: '',
    rateHold: '30_DAYS',
    rate: 0,
    ratePrimeVariance: 0,
    created: '',
    updated: '',
  },
  {
    id: 3,
    type: 'VARIABLE',
    bestRate: 4.8,
    name: '',
    family: 'VALUE_FLEX',
    term: '1_YEAR',
    insurable: false,
    insurance: 'INSURED',
    prepaymentOption: 'STANDARD',
    restrictionsOption: 'NO_RESTRICTIONS',
    restrictions: '',
    fixedPenaltySpread: '',
    helocOption: 'HELOC_WITH',
    helocDelta: 0,
    lenderName: '',
    lenderType: '',
    rateHold: '30_DAYS',
    rate: 0,
    ratePrimeVariance: 0,
    created: '',
    updated: '',
  },
  {
    id: 4,
    type: 'FIXED',
    bestRate: 5.5,
    name: '',
    family: 'VALUE_FLEX',
    term: '1_YEAR',
    insurable: false,
    insurance: 'INSURED',
    prepaymentOption: 'STANDARD',
    restrictionsOption: 'NO_RESTRICTIONS',
    restrictions: '',
    fixedPenaltySpread: '',
    helocOption: 'HELOC_WITH',
    helocDelta: 0,
    lenderName: '',
    lenderType: '',
    rateHold: '30_DAYS',
    rate: 0,
    ratePrimeVariance: 0,
    created: '',
    updated: '',
  },
  {
    id: 5,
    type: 'FIXED',
    bestRate: 5.1,
    name: '',
    family: 'VALUE_FLEX',
    term: '1_YEAR',
    insurable: false,
    insurance: 'INSURED',
    prepaymentOption: 'STANDARD',
    restrictionsOption: 'NO_RESTRICTIONS',
    restrictions: '',
    fixedPenaltySpread: '',
    helocOption: 'HELOC_WITH',
    helocDelta: 0,
    lenderName: '',
    lenderType: '',
    rateHold: '30_DAYS',
    rate: 0,
    ratePrimeVariance: 0,
    created: '',
    updated: '',
  },
];

describe('getBestProducts', () => {
  it('returns lowest rate products for VARIABLE and FIXED', () => {
    const result = getBestProducts(mockProducts);

    expect(result.variable).toHaveLength(2);
    expect(result.variable.every((p) => p.bestRate === 4.8)).toBe(true);

    expect(result.fixed).toHaveLength(1);
    expect(result.fixed[0].bestRate).toBe(5.1);
  });

  it('returns empty arrays if no products', () => {
    const result = getBestProducts([]);

    expect(result.variable).toEqual([]);
    expect(result.fixed).toEqual([]);
  });

  it('handles only one type present', () => {
    const onlyVariable: Product[] = [
      {
        id: 1,
        type: 'VARIABLE',
        bestRate: 3.5,
        name: '',
        family: 'VALUE_FLEX',
        term: '1_YEAR',
        insurable: false,
        insurance: 'INSURED',
        prepaymentOption: 'STANDARD',
        restrictionsOption: 'NO_RESTRICTIONS',
        restrictions: '',
        fixedPenaltySpread: '',
        helocOption: 'HELOC_WITH',
        helocDelta: 0,
        lenderName: '',
        lenderType: '',
        rateHold: '30_DAYS',
        rate: 0,
        ratePrimeVariance: 0,
        created: '',
        updated: '',
      },
    ];

    const result = getBestProducts(onlyVariable);

    expect(result.variable).toHaveLength(1);
    expect(result.fixed).toEqual([]);
  });
});

describe('isApplicantComplete', () => {
  const validApplicant: Applicant = {
    firstName: 'Hima',
    lastName: 'Dasari',
    email: 'himatest@email.com',
    phone: '1234567890',
  };

  it('returns true when all fields are filled', () => {
    expect(isApplicantComplete(validApplicant)).toBe(true);
  });

  it('returns false when any field is empty', () => {
    expect(isApplicantComplete({ ...validApplicant, firstName: '' })).toBe(
      false,
    );

    expect(isApplicantComplete({ ...validApplicant, lastName: '' })).toBe(
      false,
    );

    expect(isApplicantComplete({ ...validApplicant, email: '' })).toBe(false);

    expect(isApplicantComplete({ ...validApplicant, phone: '' })).toBe(false);
  });

  it('returns false when fields contain only whitespace', () => {
    expect(
      isApplicantComplete({
        ...validApplicant,
        firstName: '   ',
      }),
    ).toBe(false);
  });

  it('returns false when all fields are empty', () => {
    const emptyApplicant: Applicant = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };

    expect(isApplicantComplete(emptyApplicant)).toBe(false);
  });
});
