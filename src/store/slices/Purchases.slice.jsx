import { createSlice } from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';



export const PurchasesSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases:(state, action) => {
        return action.payload
    }
    }
})

export const getPurchasesThunk = () => dispatch => {
    dispatch( setIsLoading(true))

    axios
    .get("https://e-comerce-8pno.onrender.com/purchases", getConfig())
    .then(resp => {
        console.log(resp)
        dispatch( setPurchases(resp.data))
    })
    .catch(error => console.log(error))
    .finally( () => dispatch(setIsLoading(false)))
}

export const createPurchasesThunk = (products) => (dispatch) => {
    dispatch(setIsLoading(true));
   axios.post ("https://e-comerce-8pno.onrender.com/cart",products, getConfig() )
        .then((resp) => dispatch( getPurchasesThunk()   ))
        .catch (error => console.log(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases  } = PurchasesSlice.actions;

export default PurchasesSlice.reducer;
