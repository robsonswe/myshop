import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ stars }) => {
  const maxStars = 5;
  const filledStars = stars > maxStars ? maxStars : stars;
  const outlineStars = maxStars - filledStars;

  return (
    <div className="flex flex-row">
      {Array(filledStars)
        .fill(0)
        .map((_, index) => (
          <AiFillStar key={index} />
        ))}
      {Array(outlineStars)
        .fill(0)
        .map((_, index) => (
          <AiOutlineStar key={index + filledStars} />
        ))}
    </div>
  );
};

export default Rating;
