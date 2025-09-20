import companyLogo from "../../../assets/images/Home Icon.json";
import Container from "../Container";
import Lottie from "lottie-react";

const About = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center mt-10 mb-20">
        <div className="col-span-2">
          {/* <img src={companyLogo} alt="company logo" className="w-1/2 h-1/2 mx-auto md:w-72 md:h-1/2" /> */}
          <Lottie animationData={companyLogo} loop={true} className="w-1/2 h-1/2 mx-auto md:w-72 md:h-1/2"></Lottie>
        </div>
        <div className="">
          <p className="text-center italic font-semibold">
            🌍✨ "WanderStay is your gateway to unique stays and unforgettable
            travel experiences. From cozy hideaways to luxury escapes, we make
            it simple to discover, book, and enjoy places that feel like home
            anywhere in the world. Whether you are chasing adventure,
            relaxation, or culture, WanderStay helps you find the perfect stay
            for every journey."
          </p>
        </div>
      </div>
    </Container>
  );
};

export default About;
