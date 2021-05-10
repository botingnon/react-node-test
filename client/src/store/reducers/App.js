import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { geocoder } from "../../service/geocoder";

const initialState = {
  selectedFarm: null,
  search: "",
  checkout: {
    paymentMethod: "1"
  }
};

export const fetchGeocode = createAsyncThunk("app/fetchGeocode", async farm => {
  return await geocoder(farm.latitude, farm.longitude);
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedFarm: (state, action) => {
      state.selectedFarm = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.checkout.paymentMethod = action.payload;
    }
  },
  extraReducers: {
    [fetchGeocode.fulfilled]: (state, action) => {
      state.selectedFarm.geocode = action.payload;
    }
  }
});

export const {
  setSelectedFarm,
  setSearch,
  setPaymentMethod
} = appSlice.actions;

export const selectedFarm = state => state.app.selectedFarm;
export const activeSearch = state => state.app.search;
export const paymentMethod = state => state.app.checkout.paymentMethod;

export default appSlice.reducer;
