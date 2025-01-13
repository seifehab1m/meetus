import { saveToken } from '@/mutation/serverActions';
import { customFetch } from '@/network/fetcher';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const userData = createAsyncThunk('userData', async (usercredentials) => {
    const response = await customFetch('https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token', "POST", usercredentials);
    return response
});

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        status: 'idle',
        user: {},
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(userData.pending, (state) => {
                state.status = 'loading'; // Handle loading state
            })
            .addCase(userData.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Handle success state
                state.user = action.payload; // Add fetched posts to the state
                saveToken(state?.user?.token);
            })
            .addCase(userData.rejected, (state, action) => {
                state.status = 'failed'; // Handle error state
                state.error = action.error.message;
            });
    },
    reducers: {
        logout: (state) => {
            state.user = {};
        },
    },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
