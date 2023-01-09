import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const REACT_API_DOMAIN_URL = 'http://localhost:3000';
const REACT_API_CLIENT_DOMAIN_URL = 'http://localhost:5000';

export const getLogo = () => {
  return `${REACT_API_CLIENT_DOMAIN_URL}/static/images/logo.png`;
};

export const getCartIcon = () => {
  return `${REACT_API_CLIENT_DOMAIN_URL}/static/images/cart.svg`;
};

export const getCartAdvertise = () => {
  return `${REACT_API_CLIENT_DOMAIN_URL}/static/images/lowest-price.png`;
};

export const getBanners = createAsyncThunk('banner/getBanners', async () => {
  try {
    const resp = await axios.get(`${REACT_API_DOMAIN_URL}/banners`);
    if (resp.status === 200) {
      return resp.data;
    }
    console.error('something went wrong');
  } catch (error) {
    console.error('Unable to fetch banner images', error);
  }
});

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async () => {
    try {
      const resp = await axios.get(`${REACT_API_DOMAIN_URL}/categories`);
      if (resp.status === 200) {
        return resp.data;
      }
      console.error('something went wrong');
    } catch (error) {
      console.error('Unable to fetch category list');
    }
  }
);

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const resp = await axios.get(`${REACT_API_DOMAIN_URL}/products`);
      if (resp.status === 200) {
        return resp.data;
      }
      console.error('something went wrong');
    } catch (error) {
      console.error('Unable to fetch product list');
    }
  }
);

export const getProductFilteredByCategories = createAsyncThunk(
  'products/getProductFilteredByCategories',
  async ({ category_id }) => {
    try {
      const resp = await axios.get(`${REACT_API_DOMAIN_URL}/products`);
      if (resp.status === 200) {
        let productsData = resp.data;
        if (category_id !== 'all') {
          productsData = productsData.filter(
            (products) => products?.category === category_id
          );
        }
        return productsData;
      }
      console.error('something went wrong');
    } catch (error) {
      console.error('Unable to fetch product list');
    }
  }
);

export const getProductFilteredByProductId = async ({ product_id }) => {
  try {
    const resp = await axios.get(`${REACT_API_DOMAIN_URL}/products`);
    if (resp.status === 200) {
      let productsData = resp.data;
      productsData = productsData.filter(
        (products) => products?.id === product_id
      );
      return productsData[0];
    }
    console.error('something went wrong');
  } catch (error) {
    console.error('Unable to fetch product list');
  }
};

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ product_id }) => {
    try {
      const payload = await axios.post(
        `${REACT_API_DOMAIN_URL}/addToCart`,
        product_id
      );
      const data = await getProductFilteredByProductId({ product_id });

      if (data && payload.data.response === 'Success') {
        let responseMessage = payload.data.responseMessage;
        return {
          data,
          responseMessage,
        };
      }
      console.error('something went wrong');
    } catch (error) {
      console.error('Unable to fetch product list');
    }
  }
);
