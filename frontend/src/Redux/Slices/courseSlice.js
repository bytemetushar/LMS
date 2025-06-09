import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async () =>{
    try{
        const response = axiosInstance.get("/couses");
        toast.promise(response, {
            loading: "Loading courses...",
            success: "Courses loaded successfully!",
            error: "Failed to load courses!"
        });
        return (await response).data.courses;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: (builder) =>{

    }
});

export default courseSlice.reducer;