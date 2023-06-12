import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    setFilteredResults: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilteredResults } = searchSlice.actions;
export default searchSlice.reducer;
