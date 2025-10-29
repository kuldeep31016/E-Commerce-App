import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export async function getProducts() {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch products');
  }
}

export async function getCart() {
  try {
    const { data } = await api.get('/cart');
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to fetch cart');
  }
}

export async function addToCart(productId, quantity = 1) {
  try {
    const { data } = await api.post('/cart', { productId, quantity });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to add to cart');
  }
}

export async function updateCartItem(itemId, quantity) {
  try {
    const { data } = await api.put(`/cart/${itemId}`, { quantity });
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to update cart item');
  }
}

export async function removeFromCart(itemId) {
  try {
    const { data } = await api.delete(`/cart/${itemId}`);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to remove cart item');
  }
}

export async function clearCart() {
  try {
    const { data } = await api.delete('/cart');
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Failed to clear cart');
  }
}

export async function checkout(orderData) {
  try {
    const { data } = await api.post('/checkout', orderData);
    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Checkout failed');
  }
}


