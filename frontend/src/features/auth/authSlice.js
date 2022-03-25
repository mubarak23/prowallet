/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService"

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// redux that handle register user 
export const register = createAsyncThunk('auth/register',
  async(user, thunkAPI) => {
    try{
      return await authService.registerAuth(user)
    }catch(error){
      const message = (error.response && error.response.data
         && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
  }
)

//Redux that handle use login
export const login = createAsyncThunk('auth/login',
  async(user, thunkAPI) => {
    try{
      return await authService.loginAuth(user)
    }catch(error){
      const message = (error.response && error.response.data
         && error.response.data.message) || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ""
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isError = true
        state.message = action.payload
      })
  }
});

export const { reset } = authSlice.actions
export default authSlice.reducer