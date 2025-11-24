// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders rice mill inventory system', () => {
  render(<App />);
  const titleElement = screen.getByText(/ระบบจัดการคลังสินค้าโรงสี/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders dashboard by default', () => {
  render(<App />);
  const dashboardElement = screen.getByText(/ภาพรวมธุรกิจ/i);
  expect(dashboardElement).toBeInTheDocument();
});