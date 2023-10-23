import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  login: string;
  domain: string;
  proxy?: string;
}

const initialState: initialState = {
  login: "",
  domain: "",
  proxy: "",
};

const credentialSlice = createSlice({
  initialState,
  name: "credentials",
  reducers: {
    setCredentials: (state, action) => {
      state.domain = action.payload.domain;
      state.login = action.payload.login;
    },
    setProxy: (state, action) => {
      state.proxy = action.payload;
    },
  },
});
export default credentialSlice.reducer;
export const { setCredentials, setProxy } = credentialSlice.actions;
