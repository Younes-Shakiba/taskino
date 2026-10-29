import taskinoLogo from "../assets/taskino-2.webp";

/**
 * The brand logo, rendered straight from the asset at a given height.
 * The width follows the intrinsic ratio of the artwork.
 */
function Logo({ height = 40, className = "" }) {
  return (
    <img
      src={taskinoLogo}
      alt="تسکینو"
      className={`shrink-0 object-contain ${className}`}
      style={{ height, width: "auto" }}
    />
  );
}

export default Logo;
