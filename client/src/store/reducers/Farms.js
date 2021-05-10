import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter
} from "@reduxjs/toolkit";
import sortBy from "lodash.sortby";

import {
  findAll,
  find,
  upsert,
  deleteFarm as deleteApi
} from "../../service/farm";

const farmsAdapter = createEntityAdapter({
  selectId: entity => entity.farm_id
});

const initialState = farmsAdapter.getInitialState({
  status: "idle",
  error: null
});

export const fetchFarms = createAsyncThunk("farms/fetchFarms", async () => {
  const list = await findAll();
  return sortBy(list, "name");
});

export const findFarm = createAsyncThunk("farms/findFarm", find);
export const deleteFarm = createAsyncThunk("farms/deleteFarm", async farm => {
  const result = await deleteApi(farm);
  return result.farm_id;
});

export const addUpdateFarm = createAsyncThunk(
  "farms/addUpdateFarm",
  async initialFarm => {
    await upsert(initialFarm);
    return initialFarm;
  }
);

export const farmsSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFarms.pending]: state => {
      state.status = "loading";
    },
    [fetchFarms.fulfilled]: (state, action) => {
      state.status = "succeeded";
      farmsAdapter.upsertMany(state, action.payload);
    },
    [fetchFarms.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [findFarm.pending]: state => {
      state.status = "loading";
    },
    [findFarm.fulfilled]: (state, action) => {
      state.status = "succeeded";
      farmsAdapter.addOne(state, action.payload);
    },
    [findFarm.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addUpdateFarm.fulfilled]: farmsAdapter.upsertOne,
    [deleteFarm.fulfilled]: farmsAdapter.removeOne
  }
});

export default farmsSlice.reducer;

export const {
  selectAll: selectAllFarms,
  selectById: selectFarmById,
  selectIds: selectFarmIds
} = farmsAdapter.getSelectors(state => state.farms);
