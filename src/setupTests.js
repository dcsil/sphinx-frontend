import '@testing-library/jest-dom';

jest.mock('plotly.js/dist/plotly.js', () => ({
  Map: () => ({}),
}));
