import React from "react";
import Button from "../CommonComponents/Button";
import chefImage from "../../assets/chef.png";
import riderImageAsset from "../../assets/rider.png";

/**
 * PromoCard
 * A single background-image card with a top-left pill badge,
 * an eyebrow, a heading, and a CTA button. Local to this file
 * since it's only ever used inside PartnerRideSection.
 */
function PromoCard({
  bgImage,
  badge,
  eyebrow,
  heading,
  overlay,
  onGetStarted,
}) {
  return (
    <div
      className="relative flex h-70 w-full flex-col justify-between overflow-hidden rounded-2xl bg-cover bg-center sm:h-75"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* darkening/tint overlay so text stays legible over the photo */}
      <div className={`absolute inset-0 ${overlay}`} aria-hidden="true" />

      {/* top-left badge */}
      <div className="relative z-10 p-4">
        <span className="inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#03081F] shadow-sm">
          {badge}
        </span>
      </div>

      {/* bottom content */}
      <div className="relative z-10 p-6">
        <p className="mb-1 text-sm font-semibold text-[#FC8A06]">{eyebrow}</p>
        <h3 className="mb-4 text-2xl font-extrabold text-white">{heading}</h3>
        <Button onClick={onGetStarted}>Get Started</Button>
      </div>
    </div>
  );
}

/**
 * PartnerRideSection
 *
 * Props:
 *  - partnerImage (string, required): background image for the "Partner with us" card.
 *  - riderImage (string, required): background image for the "Ride with us" card.
 *  - onPartnerClick, onRiderClick (optional callbacks for the two CTA buttons)
 */
export default function GetStarted({
  partnerImage = chefImage,
  riderImage = riderImageAsset,
  onPartnerClick,
  onRiderClick,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <PromoCard
        bgImage={partnerImage}
        badge="Earn more with lower fees"
        eyebrow="Signup as a business"
        heading="Partner with us"
        overlay="bg-gradient-to-t from-black/85 via-black/40 to-black/10"
        onGetStarted={onPartnerClick}
      />
      <PromoCard
        bgImage={riderImage}
        badge="Avail exclusive perks"
        eyebrow="Signup as a rider"
        heading="Ride with us"
        overlay="bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        onGetStarted={onRiderClick}
      />
    </div>
  );
}