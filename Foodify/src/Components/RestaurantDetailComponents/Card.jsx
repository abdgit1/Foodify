import React from "react";
import Plus from "../../assets/plus.png";

const Card = ({ data, onBtnClick }) => {
  return (
    <article className="overflow-hidden rounded-xl p-5 bg-white shadow-[5px_5px_34px_0px_rgba(0,0,0,0.12)]">
      <div className="flex ">
        {/* Left */}

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-[18px] font-bold leading-6 text-[#03081F] line-clamp-2">
              {data.title}
            </h3>

            <p className="mt-4 text-[14px] leading-6 text-[#555] line-clamp-3">
              {data.description}
            </p>
          </div>

          <p className="text-[18px] font-bold text-[#03081F]">{data.price}</p>
        </div>

        {/* Right */}

        <div className="relative shrink-0">
          <img
            src={data.image}
            alt={data.title}
            className="h-40 w-36 rounded-xl object-cover"
          />

          {/* Add Button */}

          <div className="absolute bottom-0 right-0 rounded-tl-4xl opacity-90 rounded-br-lg bg-white/80 px-3  pt-5 backdrop-blur-sm">
            <button onClick={onBtnClick}>
              <img src={Plus} alt="" className="h-8 w-8 " />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;