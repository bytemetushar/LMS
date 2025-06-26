import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseLectures } from "../../Redux/Slices/LectureSlice";

function DisplayLectures(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {lectures} = useSelector((state)=> state.lecture);
    const {role} = useSelector((state)=> state.auth);   

    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(()=>{
        if(!state) navigate("/courses");
        dispatch(getCourseLectures(state._id))
    },[])


    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-">
                <div className="text-center text-2xl font-semibold text-yellow-500">
                    Course Name: {state?.title}
                </div>

                <div className="flex justify-center gap-10 w-full">
                    {/* left section for playing video and displaying details to admin */}
                    <div className="space-y-5 w-[20rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <video src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                            className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            controls
                            disablePictureInPicture
                            muted
                            controlsList="nodownload"
                        >
                        </video>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default DisplayLectures;