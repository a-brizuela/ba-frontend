import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  passengerType: "",
};
const selectedTravelerSlice = createSlice({
  name: "selectedTraveler",
  initialState,
  reducers: {
    setSelectedTraveler: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSelectedTraveler } = selectedTravelerSlice.actions;
export default selectedTravelerSlice.reducer;
