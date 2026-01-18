import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios');

const mockedAxios = vi.mocked(axios, true);

describe('Product Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays product details correctly', () => {
    const product = {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ['socks', 'sports', 'apparel']
    };

    const loadCart = vi.fn();

    render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(screen.getByText('$10.90')).toBeInTheDocument();

    expect(screen.getByTestId('product-image').getAttribute('src'))
      .toContain('images/products/athletic-cotton-socks-6-pairs.jpg');

    expect(screen.getByTestId('product-rating-stars-image').getAttribute('src'))
      .toContain('images/ratings/rating-45.png');

    expect(screen.getByText('87')).toBeInTheDocument();
  });

  it('adds a product to the cart', async () => {
    const product = {
      id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
      name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      rating: {
        stars: 4.5,
        count: 87
      },
      priceCents: 1090,
      keywords: ['socks', 'sports', 'apparel']
    };

    const loadCart = vi.fn();

    mockedAxios.post.mockResolvedValueOnce({});

    render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('add-to-cart-button'));

    expect(mockedAxios.post).toHaveBeenNthCalledWith(
      1,
      '/api/cart-items',
      {
        productId: product.id,
        quantity: 1
      }
    );

    expect(loadCart).toHaveBeenCalled();
  });
});
