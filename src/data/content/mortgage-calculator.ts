import type { ToolContent } from './types';

export const mortgageCalculatorContent: ToolContent = {
  slug: 'mortgage-calculator',
  intro: ['Estimate a fixed-rate mortgage payment from the property price, deposit, interest rate, and loan term. The result shows the loan amount, monthly principal-and-interest payment, total paid, and total interest.', 'Use it for planning and comparison, not as a lending quote. All calculations happen in your browser.'],
  sections: [
    { heading: 'How the payment is calculated', paragraphs: ['A fixed-rate mortgage uses an amortization formula. The monthly rate is the annual percentage rate divided by 12, and the payment spreads the balance and interest across the number of monthly payments. Early payments contain more interest; later payments contain more principal.'] },
    { heading: 'What the estimate includes', paragraphs: ['This calculator includes the property price, deposit, fixed annual rate, and term. It does not include property tax, insurance, maintenance, lender fees, points, legal costs, or early repayment rules. Those costs vary by location and lender.'] },
    { heading: 'Compare scenarios carefully', paragraphs: ['A lower monthly payment can come from a longer term, but the total interest may be higher. Compare both the monthly figure and the total paid, and use the same assumptions when comparing rates.'], tip: 'Change one input at a time and record the total interest as well as the monthly payment.' },
  ],
  faqs: [
    { q: 'What is included in the monthly payment?', a: 'The result estimates principal and interest only. Taxes, insurance, fees, and other costs are excluded.' },
    { q: 'Does a larger deposit reduce the payment?', a: 'Yes. A larger deposit reduces the loan amount, which normally reduces both the monthly payment and total interest.' },
    { q: 'Does this support fixed-rate mortgages?', a: 'Yes. It uses a standard fixed-rate amortization formula. Variable-rate loans need additional assumptions.' },
    { q: 'Is this a lender quote?', a: 'No. It is an educational estimate and should not replace an offer or advice from a qualified lender.' },
  ],
  relatedSlugs: ['percentage-calculator', 'date-difference', 'unit-converter'],
};
