import CarouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Layouts/HomeLayout";
import AboutMainImage from '../assets/images/aboutMainImage.png'
import { celebrities } from "../Constants/CelebrityData";


function AboutUs(){

    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-xl text-gray-200">
                            Our goal is to provide the affordable and eduaction to the world.
                            We are providing the platform for the aspiring teachers and students to share 
                            their skills, creativity and knowledge to each other tp empower and contribute in the growth and wellness of mankind.
                        </p>
                    </section>
                    <div className="w-1/2">
                        <img 
                            alt="about main image"
                            id="test1"
                            src={AboutMainImage} 
                            className="drop-shadow-2xl"
                            style={
                                {filter: "drop-shadow(0px 10px 10px rgb(0,0,0))"}
                            }
                         />
                    </div>
                </div>

                <div className="carousel w-1/2 my-16 m-auto">
                    {celebrities && celebrities.map(celebrity => (<CarouselSlide{...celebrity} key={celebrity.slideNumber} 
                        totalSlides= {celebrities.length}
                    />))}
                </div>
            </div>
        </HomeLayout>

    )
}

export default AboutUs;