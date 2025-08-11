import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface RatingProps { stars: number };

export default function Rating({ stars }: RatingProps) {
  const maxStars = 5;
  const filledStars = Math.floor(stars > maxStars ? maxStars : stars);
  const outlineStars = maxStars - filledStars;

  return (
    <div className="flex flex-row items-center text-yellow-400">
      {Array.from({ length: filledStars }, (_, index) => (
        <AiFillStar key={index} />
      ))}
      {Array.from({ length: outlineStars }, (_, index) => (
        <AiOutlineStar key={index + filledStars} />
      ))}
    </div>
  );
}