import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        fullName: "",
        avatar: undefined,
        previewImage: "",
        userId: useSelector((state) => state?.auth?.data?._id)
    });

    function handleImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function(){
                setData({
                    ...data,
                    avatar: uploadedImage,
                    previewImage: this.result
                });
            });

        }
    }
        
    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!data.fullName){
            toast.error("Enter name is mendetory!");
            return;
        }
        if(data.fullName.length < 4){
            toast.error("Full name should be at least 4 characters long");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);

        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate("/user/profile");
    }


    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 w-80 p-4 text-white rounded-lg min-h-[20rem] shadow-[0_0_10px_black] " 
                >
                    <h1 className="text-2xl font-semibold text-center">
                        Edit Profile
                    </h1>
                    <label 
                        className="w-28 h-28 rounded-full m-auto cursor-pointer"
                        htmlFor="image_uploads" 
                    >
                        {data.previewImage ? (
                            <img 
                                src={data.previewImage} 
                                alt="Profile_image" 
                                className="w-28 h-28 rounded-full m-auto object-cover border border-black"
                            />
                        ):(
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                        )}
                    </label>
                    <input 
                        type="file" 
                        onChange={handleImageUpload} 
                        className="hidden"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png, .webp, .svg"
                    />

                    <div className="flex flex-col gap-1">
                        <label 
                            htmlFor="fullName"
                            className="text-lg font-semibold"
                        >
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"
                            className="p-2 rounded-md border bg-transparent border-gray-300"
                            value={data.fullName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out rounded-sm font-semibold py-2 duration-300">
                        Update Profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent flex items-center justify-center w-full gap-2"> 
                            <AiOutlineArrowLeft/> Go Back to Your Profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile;