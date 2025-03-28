import Container from "@/components/Container"
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Marquee from "react-fast-marquee";

import FirebaseImg from "@/assets/img/logo/firebase.png";
import MeetImg from "@/assets/img/logo/meet.png";
import MicrosoftImg from "@/assets/img/logo/microsoft.png";

import TailwindCssImg from "@/assets/img/logo/tailwindcss.png";
import ZoomImg from "@/assets/img/logo/zoom.png";


import HeroImg from "@/assets/img/Hero.png"

const Home = () => {
    return (
        <div className="flex-col w-full pb-24">
            <Container>
                <h1 className="text-4xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text">
                    Master Your Interviews with AI
                </h1>

                {/* Description */}
                <p className="text-sm md:text-lg lg:text-xl mb-8 text-gray-500">
                    Train with intelligent mock interviews, real-time feedback, and AI-driven insights. Get ready to impress and land your dream job with confidence!
                </p>
                <div className="flex items-center justify-center sm:justify-end gap-4 lg:gap-12">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="text-2xl lg:text-4xl font-bold">1.5M+</p>
                        <p className="text-gray-800 lg:text-xl font-medium">Offers Recieved</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <p className="text-2xl lg:text-4xl font-bold">2.5M+</p>
                        <p className="text-gray-800 lg:text-xl  font-medium">Interview Aced</p>
                    </div>
                </div>

                <div className="w-full mt-4 rounded-xl bg-gray-100 h-[420px] lg:h-[600px] drop-shadow-md overflow-hidden relative">
                    <img
                        src={HeroImg}
                        alt=""
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/40 backdrop-blur-md">
                        Inteviews Copilot&copy;
                    </div>

                    <div className="hidden md:block absolute w-80 bottom-4 right-4 px-4 py-2 rounded-md bg-white/60 backdrop-blur-md">
                        <h2 className="text-neutral-800 font-semibold">Developer</h2>
                        <p className="text-sm text-neutral-500">
                            An AI-powered mock interview platform that helps you practice, get real-time feedback, and ace your interviews with confidence.
                        </p>

                        <Button className="mt-3 bg-sky-500">
                            Generate <Sparkles />
                        </Button>
                    </div>
                </div>
            </Container>
            <div className="w-full my-12">
                <Marquee >
                    <img src={FirebaseImg} alt="Logo" className="w-44 h-44 xl:w-52 xl:h-52 object-contain grayscale mx-12 " />
                    <img src={MeetImg} alt="Logo" className="w-44 h-44 xl:w-52 xl:h-52 object-contain grayscale mx-12" />
                    <img src={ZoomImg} alt="Logo" className="w-20 h-20  xl:w-40 xl:h-40 object-contain grayscale mx-12" />
                    <img src={TailwindCssImg} alt="Logo" className="w-44 h-44 xl:w-52 xl:h-52 object-contain grayscale mx-12" />
                    <img src={MicrosoftImg} alt="Logo" className="w-44 h-44 xl:w-52 xl:h-52 object-contain grayscale mx-12" />
                </Marquee>
            </div>


        </div>
    )
}

export default Home