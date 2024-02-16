import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPnr = createAsyncThunk("getPnr", async (lastName: string) => {
  if (lastName.length >= 3) {
    const response = await fetch(
      `http://localhost:8000/pnr?lastName=${lastName}`
    )
      .then((response) => response.json())
      .then((data) => data);

    if (response.length > 0) {
      return response;
    } 
    
    return response;
  }
});

const initialState = {
  data: {
    pnr: "",
    bookingReference: "",
    travelers: "",
    itinerary: "",
    contactInformation: "",
    ticketing: "",
    travelAgency: "",
    remarks: "",
  },
  isLoading: true,
  error: null as string | null,
};

const pnrSlice = createSlice({
  name: "pnr",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPnr.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPnr.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.error) {
          state.error = action.payload.message;
          state.data = initialState.data;
        } else if (action.payload) {
          state.data = action.payload[0];
        }
      })
      .addCase(fetchPnr.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default pnrSlice.reducer;
