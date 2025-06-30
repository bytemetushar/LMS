import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/courseSlice";
import HomeLayout from "../../Layouts/HomeLayout"
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail : null,
        previewImage: ""
    });

    function handleImageUpload(e){

        const uploadedImage = e.target.files[0];
            if(uploadedImage.size > 1024 * 1024){ // 1MB limit
                toast.error("Image size should be less than 1MB");
                return;
            } 
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function(){
                setUserInput({
                    ...userInput,
                    thumbnail: uploadedImage,
                    previewImage: fileReader.result
                });
            })
    }



    function handleUserInput(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function OnFormSubmit(e){
        e.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail){
            toast.error("All fields are required");
            return;
        }

        const response = await dispatch(createNewCourse(userInput));
        if(response?.payload?.success){
            setUserInput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                thumbnail : null,
                previewImage: ""
            });
            
        }
        setTimeout(() => navigate("/courses"), 0);
        
        
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    onSubmit={OnFormSubmit}
                    className="flex flex-col justify-center gap-5 p-4 rounded-lg text-white w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >

                    <Link className="absolute top-6 text-2xl link text-accent" onClick={() => navigate(-1)}>
                        <AiOutlineArrowLeft/>
                    </Link>

                    <h1 className="text-2xl font-bold text-center">
                        Create New Course
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.previewImage ? (
                                        <img 
                                            src={userInput.previewImage} 
                                            alt="Course Thumbnail" 
                                            className="w-full h-48 object-cover rounded-lg mb-4"
                                        />
                                    ) : (
                                        <div className="w-full h-44 bg-gray-700 border rounded-lg flex items-center justify-center m-auto">
                                            <span className="text-lg font-bold text-gray-400">Upload Course Thumbnail</span>
                                        </div>
                                    )}
                                </label>
                                <input 
                                    required
                                    type="file" 
                                    id="image_uploads" 
                                    name="image_uploads" 
                                    accept=".jpg, .jpeg, .png" 
                                    onChange={handleImageUpload} 
                                    className="hidden"
                                />
                            </div>
                            
                            <div className="flex flex-col gap-1 mt-4">
                                <label 
                                    htmlFor="title"
                                    className="text-xl font-semibold"
                                >
                                    Course Title
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    placeholder="Enter Course Title"
                                    value={userInput.title}
                                    onChange={handleUserInput}
                                    className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
                                />
                            </div>
                        </div>


                        <div className="flex flex-col gap-1">
                             <div className="flex flex-col gap-1">
                                <label 
                                    htmlFor="createdBy"
                                    className="text-xl font-semibold"
                                >
                                    Course Instructor
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    id="createdBy" 
                                    name="createdBy" 
                                    placeholder="Enter Course Instructor"
                                    value={userInput.createdBy}
                                    onChange={handleUserInput}
                                    className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label 
                                    htmlFor="category"
                                    className="text-xl font-semibold"
                                >
                                    Course Category
                                </label>
                                <input 
                                    required
                                    type="text" 
                                    id="category" 
                                    name="category" 
                                    placeholder="Enter Course category"
                                    value={userInput.category}
                                    onChange={handleUserInput}
                                    className="p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-accent"
                                />
                            </div>


                            <div className="flex flex-col gap-1">
                                <label 
                                    htmlFor="description"
                                    className="text-xl font-semibold"
                                >
                                    Course description
                                </label>
                                <textarea 
                                    required
                                    type="text" 
                                    id="description" 
                                    name="description" 
                                    placeholder="Enter Course description"
                                    value={userInput.description}
                                    onChange={handleUserInput}
                                    className="p-2 rounded-lg bg-gray-800 border border-gray-700 h-24 overflow-y-scroll resize-none focus:outline-none focus:border-accent"
                                />
                            </div>
                        </div>
                    </main>
                    <button 
                        type="submit" 
                        className="bg-yellow-600 font-semibold text-lg p-2 rounded-lg hover:bg-yellow-500 transition-all ease-in-out duration-300"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse;