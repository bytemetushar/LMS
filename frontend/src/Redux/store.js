import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/courseSlice";
import RazorpaySlice from "./Slices/RazorpaySlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: RazorpaySlice
    },
    devTools: true
});

export default store;