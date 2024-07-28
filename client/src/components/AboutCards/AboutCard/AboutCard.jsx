import React from "react";

function AboutCard({ heading, content, imageUrl, linkText }) {
  return (
    <div className="hover:scale-110 drop-shadow-lg transition-all flex flex-col items-center sm:h-[25rem] sm:w-[23rem] w-[18rem] bg-white rounded-2xl p-5 gap-3">
      <div
        className="sm:h-[200px] h-[150px] w-[17rem] drop-shadow-lg sm:w-[340px] bg-cover rounded-2xl"
        style={{
          backgroundImage: `url(${imageUrl || "/images/hero_cover.jpg"})`,
        }}
      ></div>
      <div className="sm:h-[150px] h-[160px] cursor-default text-center flex flex-col gap-3">
        <h4 className="font-bold text-wrap">
          {heading || "Heading of the card"}
        </h4>
        <p className="text-sm text-gray-800">
          {content ||
            "lorem25 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium labore cum excepturi debitis quod mollitia aut quibusdam dolore. Recusandae officia dolorum eaque voluptas, numquam iure."}
        </p>
      </div>
      <p className="text-sm cursor-pointer text-custom-link-blue">
        {linkText || "link"} &#8594;
      </p>
    </div>
  );
}

export default AboutCard;
