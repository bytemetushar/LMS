import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import { isValidEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function Contact(){

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    });


    function handleInputChange(e){
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("Please fill all the fields");
            return;
        }

        // checking valid email id
        if(!isValidEmail(userInput.email)){
            toast.error("Invalid Email id!!");
            return;
        }

        try{
            const response = axiosInstance.post("/contact",userInput);
            toast.promise(response, {
                loading: "Sending your message...",
                success: "Form Submitted Successfully!",
                error: "Failed to submit the form. Please try again later."
            });
            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                });
            }
        }catch(err){
            toast.error("An error occurred while submitting the form. Please try again later.");
        }

    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh]">
                <form 
                    noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]"
                    >
                    
                    <h1 className="text-3xl font-semibold">
                        Contact Us
                    </h1>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name" className="text-xl font-semibold">
                            Name
                        </label>
                        <input 
                            type="text" 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={userInput.name}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="email" className="text-xl font-semibold">
                            Email
                        </label>
                        <input 
                            type="email" 
                            className="bg-transparent border px-2 py-1 rounded-sm"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleInputChange}
                            value={userInput.email}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="message" className="text-xl font-semibold">
                            Message
                        </label>
                        <textarea 
                            className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
                            id="message"
                            name="message"
                            placeholder="Enter your message"
                            onChange={handleInputChange}
                            value={userInput.message}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-yellow-600 w-full font-semibold text-lg px-4 py-2 rounded-sm hover:bg-yellow-500 transition-all ease-in-out duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Contact;