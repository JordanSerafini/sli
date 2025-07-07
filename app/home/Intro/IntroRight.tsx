import Image from "next/image";
import React from "react";

function IntroRight() {
  return (
    <div className="flex-none w-3/5 max-w-[60%] h-full m-0 p-[35px] rounded-[15px] 
                    bg-gradient-to-r from-[#04a2df] to-[#00ceff] 
                    transition-all duration-300 hover:transform hover:shadow-lg
                    flex flex-col justify-center
                    max-[830px]:flex-1 max-[830px]:max-w-full max-[830px]:w-full max-[830px]:self-center
                    max-[414px]:flex-1 max-[414px]:max-w-full max-[414px]:w-full">
      
      {/* Content Section - right_content */}
      <div className="mb-[30px]">
        <h1 className="text-white">
          Apporteur de solution informatique
        </h1>
        <p className="text-white text-[1.2em] my-5">
          Intégrateur de solutions complètes et prestataire de services en conseils informatiques, 
          nous innovons quotidiennement pour les PME, PMI, TPE, indépendants, collectivités et associations.
        </p>
      </div>
      
      {/* Image Section - right_image */}
      <div className="flex justify-center items-center w-full">
        <Image
          className="w-full h-auto mt-5 object-contain"
          alt="Solution Informatique"
          src="/assets/solution.webp"
          width={500}
          height={375}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
    </div>
  );
}

export default IntroRight;