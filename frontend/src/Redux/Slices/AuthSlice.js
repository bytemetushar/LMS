import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance'

const initialState = {
        isLoggedIn: localStorage.getItem("isLoggedIn") || false,
        role: localStorage.getItem("role") || "",
        data: localStorage.getItem("data") || {},
};


export const createAccount = createAsyncThunk("/auth/signup", async (data)=>{
    try{
        const res = axiosInstance.post("/user/login",data);
        toast.promise(res,{
            loading: "Wait! creating your account",
            success: (data) =>{
                return data?.data?.message;
            },
            error:"failed to create account!"

        })
        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});


export const login = createAsyncThunk("/auth/signup", async (data)=>{
    try{
        const res = axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading: "Wait! Authentication is in process...",
            success: (data) =>{
                return data?.data?.message;
            },
            error:"Failed to log in!"

        })
        return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(login.fulfilled, (state,action) => {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;