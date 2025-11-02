import { Star, StarHalf } from "lucide-react"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
}

export function StarRating({ rating, maxRating = 5, size = "sm" }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  const sizeClass = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size]

  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`star-${i}`} className={`${sizeClass} fill-primary text-primary`} />
      ))}
      {hasHalfStar && <StarHalf className={`${sizeClass} fill-primary text-primary`} />}
      {Array.from({ length: maxRating - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star key={`empty-star-${i}`} className={`${sizeClass} text-muted-foreground`} />
      ))}
    </div>
  )
}
