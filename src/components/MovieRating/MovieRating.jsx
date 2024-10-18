import './MovieRating.css'

const MovieRating = ({ score }) => {
  let borderColor

  if (score < 3) {
    borderColor = '#E90000'
  } else if (score < 5) {
    borderColor = '#E97E00'
  } else if (score < 7) {
    borderColor = '#E9D100'
  } else {
    borderColor = '#66E900'
  }

  const roundedScore = score.toFixed(1)

  return (
    <div className="rating" style={{ borderColor }}>
      {roundedScore}
    </div>
  )
}

export default MovieRating
