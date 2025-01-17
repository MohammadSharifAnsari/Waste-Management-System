import React from "react";
import ArticleCard from "./ArticleCard/ArticleCard";
import LArticalCard from "../DisplayArticals/LArticalCard/LArticalCard.jsx";
function ArticleCards() {
  return (
    <section className="p-8 flex flex-col items-center justify-center gap-8 bg-custom-offWhite">
      <h3 className="font-bold text-3xl">Articles</h3>
      <div className="flex flex-wrap gap-8 justify-center items-center  w-auto ">
        {/* <ArticleCard
          heading="The on-pack recycling label (or OPRL)"
          content="Look out for the following labels which appear on all sorts of packaging - from soft drink cans, to bread bags and plastic toiletry bottles. They will tell you whether the packaging is likely to be collected for recycling or if you can take it to your local recycling centre."
          imageUrl="/images/number_cover/two.webp"
        /> */}
        
        <LArticalCard  heading="The on-pack recycling label (or OPRL)"
          content="Look out for the following labels which appear on all sorts of packaging - from soft drink cans, to bread bags and plastic toiletry bottles. They will tell you whether the packaging is likely to be collected for recycling or if you can take it to your local recycling centre."
          imageUrl="/images/number_cover/two.webp"
          id="66ad162706166f246efe886c"
          author="Faizan Ansari"
          />
        <LArticalCard   heading="Refill shops: Everything you need to know"
          content="Are you among the two thirds of the UK population who have a concern about plastic waste? Research from WRAP, the climate action NGO that brings you Recycle Now, shows that..."
          imageUrl="/images/number_cover/four.webp"
          id="66ad14f706166f246efe8847"
          author="Sharif"
          />
        <LArticalCard   heading="Tips to reduce recycling contamination"
          content="Putting the right stuff in the right bin is important. The wrong stuff is called contamination. Most of us are getting it right, however, when too much contaminated material is collected, it potentially prevents the whole lorry load of material from being recycled."
          imageUrl="/images/number_cover/one.webp"
          id="66ad16c606166f246efe8870"
          author="Ayaz Ansari"
          />
        <LArticalCard   heading="Tips to reduce recycling contamination"
          content="Putting the right stuff in the right bin is important. The wrong stuff is called contamination. Most of us are getting it right, however, when too much contaminated material is collected, it potentially prevents the whole lorry load of material from being recycled."
          imageUrl="/images/number_cover/three.webp"
          id="66ad16c606166f246efe8870"
          author="Mohammad Sharif Ansari"
          />
{/* client/public/images/number_cover/three.webp */}
        {/* <ArticleCard
          heading="Refill shops: Everything you need to know"
          content="Are you among the two thirds of the UK population who have a concern about plastic waste? Research from WRAP, the climate action NGO that brings you Recycle Now, shows that..."
          imageUrl="/images/number_cover/four.webp"
        /> */}
        {/* <ArticleCard
          heading="Tips to reduce recycling contamination"
          content="Putting the right stuff in the right bin is important. The wrong stuff is called contamination. Most of us are getting it right, however, when too much contaminated material is collected, it potentially prevents the whole lorry load of material from being recycled."
          imageUrl="/images/number_cover/one.webp"
        /> */}
        {/* <ArticleCard imageUrl="/images/number_cover/three.webp" /> */}
      </div>
    </section>
  );
}

export default ArticleCards;
