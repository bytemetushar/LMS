import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/courseSlice";
import RazorpaySlice from "./Slices/RazorpaySlice";
import lectureSliceReducer from './Slices/LectureSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay: RazorpaySlice,
        lecture: lectureSliceReducer
    },
    devTools: true,
});

export default store;