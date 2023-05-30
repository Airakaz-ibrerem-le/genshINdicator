import styled from 'styled-components'
import Image from 'next/image'

import type { CharBannerProps } from './CharBanner.types'
import StarRating from '../StarRating'

const Container = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.paleBlue};
`

const CharacterInfo = styled.div`
  display: flex;
  width: 60%;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const CharacterName = styled.h2`
  color: ${({ theme }) => theme.white};
  font-size: 32px;
`

const CharacterBanner = ({ character }: CharBannerProps): JSX.Element => {
  return (
    <Container>
      <Image src={`/${character.path}`} alt={character.name} width={116} height={146}/>
      <CharacterInfo>
        <CharacterName>{character.name}</CharacterName>
        <StarRating rating={character.rating}/>
      </CharacterInfo>
      <Image src={`/${character.elementPath}`} alt={character.elementPath.substring(0, -4)} width={86} height={104}/>
    </Container>
  )
}

export default CharacterBanner
