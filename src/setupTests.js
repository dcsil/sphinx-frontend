import '@testing-library/jest-dom';

jest.mock('plotly.js/dist/plotly.js', () => ({
  Map: () => ({}),
}));

jest.mock('react-chartjs-2', () => ({
  Bar: () => null,
  Line: () => null,
  Pie: () => null,
}));
