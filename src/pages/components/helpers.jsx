import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export function Rating({ stars }) {
  const maxStars = 5;
  const filledStars = Math.floor(stars > maxStars ? maxStars : stars);
  const outlineStars = maxStars - filledStars;

  return (
    <div className="flex flex-row">
      {Array.from({ length: filledStars }, (_, index) => (
        <AiFillStar key={index} />
      ))}
      {Array.from({ length: outlineStars }, (_, index) => (
        <AiOutlineStar key={index + filledStars} />
      ))}
    </div>
  );
}

export function catTitle(str) {
  return str
    .replace(/-/g, " ")
    .replace(/\b[a-z]/g, (char) => char.toUpperCase());
}
