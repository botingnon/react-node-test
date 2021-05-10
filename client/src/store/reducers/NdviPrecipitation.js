import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";

import { fecthNdviPrecipitationData } from "../../service/farm";

const adapter = createEntityAdapter({
  selectId: entity => entity._id
});

const initialState = adapter.getInitialState({
  status: "idle",
  error: null
});

export const fetchData = createAsyncThunk(
  "ndviprecipitation/fetchData",
  fecthNdviPrecipitationData
);

export const slice = createSlice({
  name: "ndviprecipitation",
  initialState,
  reducers: {
    resetAdapter: () => initialState,
    addNew: (state, action) => {
      adapter.addOne(state, action.payload);
    },
    remove: (state, action) => {
      adapter.removeOne(state, action.payload);
    }
  },
  extraReducers: {
    [fetchData.pending]: state => {
      state.status = "loading";
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      adapter.upsertMany(state, action.payload);
    },
    [fetchData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    }
  }
});

export default slice.reducer;
export const { resetAdapter, addNew, remove } = slice.actions;

export const { selectAll } = adapter.getSelectors(
  state => state.ndviprecipitation
);
