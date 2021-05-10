import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const { setUser } = userSlice.actions;

export const userData = state => state.user;

export default userSlice.reducer;
