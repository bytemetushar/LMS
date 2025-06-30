import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCourseLecture, getCourseLectures } from "../../Redux/Slices/LectureSlice";
import { ImFileEmpty } from "react-icons/im";

function DisplayLectures(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const {lectures} = useSelector((state)=> state.lecture);
    const {role} = useSelector((state)=> state.auth);   

    const [currentVideo, setCurrentVideo] = useState(0);

    async function onLectureDelete(courseId, lectureId){
        await dispatch(deleteCourseLecture({courseId: courseId, lectureId: lectureId}));
        await dispatch(getCourseLectures(courseId));
    }

    useEffect(()=>{
        if(!state) navigate("/courses");
        dispatch(getCourseLectures(state._id))
    },[])


    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-">
                <div className="text-center text-3xl font-semibold text-yellow-400">
                    Course Name: {state?.title}
                </div>

                
                {(lectures && lectures.length > 0) ? 
                    (<div className="flex justify-center gap-10 w-full">
                        {/* left section for playing video and displaying details to admin */}
                        <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                            <video src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                controls
                                disablePictureInPicture
                                muted
                                controlsList="nodownload"
                            >
                            </video>
                            <div>
                                <h1>
                                    <span className="text-yellow-500">
                                        Titile: {" "}
                                    </span>
                                    {lectures && lectures[currentVideo]?.title}
                                </h1>
                                <p>
                                    <span className="text-yellow-500 line-clamp-4">
                                        Description: {" "}
                                    </span>
                                    {lectures && lectures[currentVideo]?.description}
                                </p>
                            </div>
                        </div>

                        {/** right screen fr displaying list of lectures */}
                        <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                            <li className="fnt-semibold text-xl text-yellow-500 flex items-center justify-between">
                                <p>Lectures List</p>
                                {role === "ADMIN" && (
                                    <button onClick={()=> navigate("/course/addlecture", {state: {...state}})} className="bg-blue-900 px-2 py-1 rounded-md font-semibold text-white text-sm">
                                        Add new Lecture
                                    </button>
                                )}
                            </li>
                            {lectures && 
                                lectures.map((lecture, idx)=>{
                                    return (
                                        <li className="space-y-2" key={lecture._id}>
                                            <p className="cursor-pointer" onClick={()=> setCurrentVideo(idx)}>
                                                <span>
                                                    {" "}Lecture {idx + 1}: {" "}
                                                </span>
                                                {lecture?.title}
                                            </p>
                                            {role === "ADMIN" && (
                                                <button onClick={() => onLectureDelete(state?._id, lecture?._id)} className="bg-red-600 px-2 py-1 rounded-md font-semibold text-sm">
                                                    Delete Lecture
                                                </button>
                                            )}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>) : (
                    <div className="flex flex-col space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                        <div className="p-5 text-center text-2xl font-semibold text-yellow-400 relative">
                            <div className="absolute left-1 p-1">
                                <ImFileEmpty />
                            </div>
                            <h1>
                                Mentor not added lectures yet!!
                            </h1>
                            <div className="p-4 text-xl text-white">
                                <p>
                                    Wait for Mentor to upload the lectures, please come after some time.. 
                                </p>
                            </div>
                        </div>
                        {role === "ADMIN" && (
                            <button onClick={()=> navigate("/course/addlecture", {state: {...state}})} className="bg-blue-900 px-2 py-2 rounded-md font-semibold text-white text-sm">
                                Add new Lecture
                            </button>
                        )}
                        {role === "User" && (
                            <button onClick={()=> navigate("/courses", {state: {...state}})} className="bg-red-500 px-2 py-2 rounded-md font-semibold text-white text-sm">
                                Go back
                            </button>
                        )}

                    </div>
                )}
            </div>
        </HomeLayout>
    )
}

export default DisplayLectures;