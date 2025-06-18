import { useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function Profile(){

    const userData = useSelector((state) => state?.auth?.data);

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <img 
                        src={userData?.avatar?.secure_url} 
                        alt="Profile_image" 
                        className="w-40 m-auto rounded-full border border-black"
                    />
                    <h3 className="text-2xl font-semibold text-yellow-500 text-center capitalize">
                        {userData?.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p>Email: </p><p>{userData?.email}</p>
                        <p>Role: </p><p>{userData.role}</p>
                        <p>Subscription: </p><p>{userData?.subscription?.status  === "active" ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link 
                            to="/changepassword" 
                            className="w-1/2 text-center bg-yellow-600 hover:bg-yellow-800 transition-all ease-in-out rounded-sm font-semibold py-2 duration-300">
                                <button>Change Password</button>
                        </Link>
                        <Link 
                            to="/user/editprofile" 
                            className="w-1/2 text-center bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out rounded-sm font-semibold py-2 duration-300">
                                <button>Edit Profile</button>
                        </Link>
                    </div>

                    {userData?.subscription?.status === "active" && (
                        <button className="w-full bg-transparent hover:bg-red-800 hover:border-red-800 border border-accent transition-all ease-in-out rounded-sm font-semibold py-2 duration-300">
                            Cancel Subscription
                        </button>
                    )}

                </div>
            </div>
        </HomeLayout>
    )
}


export default Profile;