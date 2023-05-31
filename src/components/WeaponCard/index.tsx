import styled from 'styled-components'

import Image from 'next/image'
import { WeaponCardProps } from './WeaponCard.types'

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 80px;
  height: 80px;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  position: relative;
  object-fit: cover;
`

const WeaponCard = ({ cardPath, onClick }: WeaponCardProps): JSX.Element => {
  return (
    <Container onClick={onClick}>
      <StyledImage src={`/${cardPath}`} alt={cardPath} fill />
    </Container>
  )
}

export default WeaponCard
