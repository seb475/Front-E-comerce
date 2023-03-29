import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      return action.payload;
    }
  }
});

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get("https://e-comerce-8pno.onrender.com/products")
    .then((resp) => dispatch(setProducts(resp.data)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterCategoriesThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));

  axios
    .get(`https://e-comerce-8pno.onrender.com/categories=${id}`)
    .then((resp) => {
      dispatch(setProducts(resp.data));
    })
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
};

export const filterByTermThunk = (term) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios
  .get(`https://e-comerce-8pno.onrender.com/products?query=${term}`)
    .then((resp) => dispatch(setProducts(resp.data)))
    .catch((error) => console.error(error))
    .finally(() => dispatch(setIsLoading(false)));
  };



export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;