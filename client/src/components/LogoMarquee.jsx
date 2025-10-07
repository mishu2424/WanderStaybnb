import Marquee from "react-fast-marquee";
import MarqueePicture from "./shared/MarqueePicture";
const LogoMarquee = () => {
  return (
    <div className="my-24">
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 w-full lg:w-1/2 mx-auto py-5">
        <h1 className="uppercase text-xl font-bold text-right">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
            Trusted Partners & Sponsors
          </span>
        </h1>
        <p className="flex-2 text-left text-base font-thin text-gray-400 border-l-4 pl-3">
          We are proud to collaborate with some of the most recognized and
          trusted brands in the world. Their partnership helps us continue
          delivering exceptional travel experiences and reliable hospitality
          services across the globe.
        </p>
      </div>
      <hr className="my-5 w-3/4 mx-auto border-spacing-0.5 border-gray-400"/>
      <Marquee direction="right" speed={20}>
        <div className="flex items-center space-x-9">
          <MarqueePicture
            imgSrc={"https://i.ibb.co/rR2rgsqw/Uber-logo-2018.png"}
          />
          <MarqueePicture imgSrc={"https://i.ibb.co/tT3nqnhp/images.png"} />
          <MarqueePicture imgSrc={"https://i.ibb.co/KjxRkfn7/images-1.png"} />
          <MarqueePicture
            imgSrc={"https://i.ibb.co/Zpf1Xy54/doordash-placeholder.jpg"}
          />
          <MarqueePicture
            imgSrc={"https://i.ibb.co/rR2rgsqw/Uber-logo-2018.png"}
          />
          <MarqueePicture imgSrc={"https://i.ibb.co/tT3nqnhp/images.png"} />
          <MarqueePicture imgSrc={"https://i.ibb.co/KjxRkfn7/images-1.png"} />
          <MarqueePicture
            imgSrc={"https://i.ibb.co/Zpf1Xy54/doordash-placeholder.jpg"}
          />
          <MarqueePicture
            imgSrc={"https://i.ibb.co/rR2rgsqw/Uber-logo-2018.png"}
          />
          <MarqueePicture imgSrc={"https://i.ibb.co/tT3nqnhp/images.png"} />
          <MarqueePicture imgSrc={"https://i.ibb.co/KjxRkfn7/images-1.png"} />
          <MarqueePicture
            imgSrc={"https://i.ibb.co/Zpf1Xy54/doordash-placeholder.jpg"}
          />
        </div>
      </Marquee>
    </div>
  );
};

export default LogoMarquee;
