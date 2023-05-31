import styled from 'styled-components'
import Image from 'next/image'

import { GrClose } from 'react-icons/gr'
import { WeaponBannerProps } from './WeaponBanner.types'

const Container = styled.div`
  width: 100%;
  height: 30vh;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
`

const ErrorContainer = styled.div`
  width: 100%;
  height: 20vh;
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
`

const StyledClose = styled(GrClose)`
  fill: red !important;
  stroke: red !important;
`

const WeaponName = styled.h2`
  width: 100%;
  text-align: start;
`

const WeaponInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`

const WeaponLevel = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`

const WeaponBanner = ({ weapon, onClick }: WeaponBannerProps): JSX.Element => {
  if (weapon === undefined || weapon.id <= 0) {
    return (
      <ErrorContainer onClick={onClick}>
        <StyledClose color='#FF0000'/>
        <h1>No Weapon Equipped !</h1>
      </ErrorContainer>
    )
  }

  return (
    <Container onClick={onClick}>
      <WeaponName>Weapon : {weapon.name}</WeaponName>
      <WeaponInfo>
        <Image src={`/${weapon.path}`} alt={weapon.name} width={120} height={120}/>
        <WeaponLevel>
          <h2>Level : {weapon.level} -&gt; {weapon.wanted}</h2>
          <h2>Phase : {weapon.phase} -&gt; {weapon.wantedPhase}</h2>
        </WeaponLevel>
      </WeaponInfo>
    </Container>
  )
}

export default WeaponBanner
