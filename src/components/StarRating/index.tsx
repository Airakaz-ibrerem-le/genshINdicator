import styled from 'styled-components'

import { RiStarSFill } from 'react-icons/ri'
import { StarRatingProps } from './StarRating.types'

interface StyledStarRating {
  index: number
  rating: number
}

const Container = styled.div`
  display: flex;
  gap: 5px;
`

const StyledStar = styled(RiStarSFill) <StyledStarRating>`
  opacity: ${({ index, rating }) => index <= rating ? 1 : 0.5};
  fill: ${({ theme }) => theme.paleYellow};
`

const StarRating = ({ rating }: StarRatingProps): JSX.Element => {
  return (
    <Container>
      {Array.from({ length: 5 }, (_, ind) => ind + 1).map(val => (
        <StyledStar size={30} index={val} rating={rating} key={val} />
      ))}
    </Container>
  )
}

export default StarRating
