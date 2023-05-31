import styled from 'styled-components'
import { useCallback } from 'react'

import Button from '../Button'
import WeaponCard from '../WeaponCard'
import { Weapon } from '@/queries/Weapons/Weapons.types'
import { AddWeaponProps } from './AddWeapon.types'
import { useAddWeapon, useFetchAvailableWeaponsQuery } from '@/queries/Weapons'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const AvailableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1px;
  grid-row-gap: 0px;
  justify-content: center;
  align-items: center;
`

const AddWeapon = ({ onConfirm, charId, charWeaponType }: AddWeaponProps): JSX.Element => {
  const { data } = useFetchAvailableWeaponsQuery(charWeaponType)
  const { mutateAsync } = useAddWeapon(charId)
  const onClick = useCallback(async (weapon: Weapon) => {
    await mutateAsync(weapon)
    onConfirm()
  }, [mutateAsync])

  return (
    <Container>
      <AvailableContainer>
        {data !== undefined
          ? data.map((weapon) => (<WeaponCard onClick={() => onClick(weapon)} key={weapon.id} cardPath={weapon.path} id={weapon.id} />))
          : <></>}
      </AvailableContainer>
    </Container>
  )
}

export default AddWeapon
