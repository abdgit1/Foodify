import React from "react";
import coupleImage from "../../assets/couple.png";
import orderUkLogo from "../../assets/OrderUKLogo.png";
import appStoreBadges from "../../assets/app-store-badges.png";

/**
 * DownloadBanner
 *
 * Props:
 *  - imageSrc (string, required): the couple photo you provide.
 *  - imageAlt (string, optional)
 *  - appBadgesSrc (string, required): the combined App Store + Google Play
 *    badge image you provide (e.g. app-store-badges-en.png).
 *  - storeHref (string, optional): since both badges are one image, this
 *    single link wraps the whole graphic (defaults to "#").
 */
export default function DownloadBanner({
  imageSrc = coupleImage,
  imageAlt = "Couple ordering on their phones",
  imageLogo = orderUkLogo,
  imageLogoAlt = "Order.uk",
  appBadgesSrc = appStoreBadges,
  appBadgesAlt = "Download on the App Store and Google Play",
  storeHref = "#",
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#EFEFEF]">
      <div className="flex min-h-72 items-stretch">
        {/* Image side */}
        <div className="relative lg:w-[50%] sm:w-[45%] self-end pt-6 pl-4 sm:pl-8">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-top"
            style={{
              maskImage:
                "linear-gradient(to right, black 75%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, black 75%, transparent 100%)",
            }}
          />
        </div>

        {/* Text side */}
        <div className="flex flex-1 lg:w-[50%] flex-col justify-center gap-3 px-6 py-8 sm:px-4 md:px-2 lg:pl-2 lg:pr-10">
          <h1 className="flex flex-wrap items-center gap-1 text-3xl font-extrabold text-[#03081F] sm:text-4xl lg:text-5xl">
            <img
              src={imageLogo}
              alt={imageLogoAlt}
              className="inline-block h-8 w-auto object-contain sm:h-10 lg:h-12"
            />
            <span>ing is more</span>
          </h1>

          <div className="flex justify-end items-center rounded-full h-auto bg-[#03081F] px-6 py-2.5">
            <span className="text-xl font-bold text-[#FC8A06] underline decoration-2 underline-offset-2 sm:text-2xl">
              Personalised
            </span>
            <span className="ml-2 text-xl font-bold text-white sm:text-2xl">
              &amp; Instant
            </span>
          </div>

          <p className="text-sm text-center text-gray-500">
            Download the Order.uk app for faster ordering
          </p>

          <a href={storeHref} className="mt-1 inline-block w-fit">
            <img
              src={appBadgesSrc}
              alt={appBadgesAlt}
              className="h-9 w-auto "
            />
          </a>
        </div>
      </div>
    </section>
  );
}