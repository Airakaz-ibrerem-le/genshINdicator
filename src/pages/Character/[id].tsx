import styled from 'styled-components'
import { useCallback, useState } from 'react'
import { useRouter as useRouterRoute } from 'next/router'
import { useRouter as useRouterNav } from 'next/navigation'

import Modal from '@/components/Modal'
import Button from '@/components/Button'
import WeaponBanner from '@/components/WeaponBanner'
import CharacterBanner from '@/components/CharacterBanner'
import ModifyCharacter from '@/components/ModifyCharacter'
import { Character } from '@/queries/Characters/Characters.types'
import { useDeleteCharacter, useFetchOwnedCharDetailQuery } from '@/queries/Characters'
import AddWeapon from '@/components/AddWeapon'
import { WeaponType } from '@/queries/Weapons/Weapons.types'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundColor};
`

const DATA: Character[] = [{
  id: 1,
  level: 1,
  wanted: 90,
  phase: 0,
  wantedPhase: 6,
  elementPath: 'Pyro.png',
  name: 'Dilouc',
  path: 'Diluc.png',
  rating: 5,
  skill: [{
    level: 1,
    type: 0,
    wanted: 10
  }, {
    level: 1,
    type: 1,
    wanted: 10
  }, {
    level: 1,
    type: 2,
    wanted: 10
  }],
  type: WeaponType.CLAYMORE,
  weapon: {
    id: 42,
    name: 'Mort du loup',
    type: WeaponType.CLAYMORE,
    level: 1,
    wanted: 90,
    phase: 1,
    wantedPhase: 6,
    path: "Wolf's_Gravestone.png"
  }
}]

const InfoContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 10px;
  flex-direction: column;
  color: ${({ theme }) => theme.white};
  padding: 15px;
  font-size: 18px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    width: 90%;
    height: 2px;
    background: ${({ theme }) => theme.borderColor}77;
  }
`

const ButtonContainer = styled.div`
  margin-top: auto;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 0;
`

const ModifyButton = styled(Button)`
  width: 80%;
  color: ${({ theme }) => theme.black};
  height: 30px;
  font-size: 20px;
  padding: 10px 0;
  background: ${({ theme }) => theme.paleYellow};
`

const BackButton = styled(Button)`
  width: 80%;
  font-size: 20px;
  height: 30px;
  padding: 10px 0;
  background: ${({ theme }) => theme.borderColor}7F;
`

const DeleteButton = styled(Button)`
  width: 80%;
  font-size: 20px;
  height: 30px;
  padding: 10px 0;
  background: ${({ theme }) => theme.delete};
`

const CharacterProfile = (): JSX.Element => {
  const router = useRouterNav()
  const routerRoute = useRouterRoute()
  const charId = Number(routerRoute.query.id) ?? 1
  const { data } = useFetchOwnedCharDetailQuery(charId)
  const { mutateAsync } = useDeleteCharacter()
  const [openModify, updateOpenModify] = useState<boolean>(false)
  const [openWeapon, updateOpenWeapon] = useState<boolean>(false)
  const deleteChar = useCallback(async () => {
    if (data === undefined) {
      return
    }
    await mutateAsync(data)
    router.back()
  }, [data, mutateAsync])

  if (data === undefined) {
    return (
      <Container>
        Loading...
      </Container>
    )
  }
  console.log(data)

  return (
    <Container>
      <CharacterBanner character={data} />
      <InfoContainer>
        <h2>Level : {data.level} -&gt; {data.wanted}</h2>
        <h2>Phase : {data.phase} -&gt; {data.wantedPhase}</h2>
      </InfoContainer>
      <InfoContainer>
        <h2>Auto : {data.skill[0].level} -&gt; {data.skill[0].wanted}</h2>
        <h2>Elemental : {data.skill[1].level} -&gt; {data.skill[1].wanted}</h2>
        <h2>Burst : {data.skill[2].level} -&gt; {data.skill[2].wanted}</h2>
      </InfoContainer>
      <WeaponBanner weapon={data.weapon} onClick={() => updateOpenWeapon(true)} />
      <ButtonContainer>
        <ModifyButton onClick={() => updateOpenModify(true)}>Modify</ModifyButton>
        <BackButton onClick={() => router.back()}>Back</BackButton>
        <DeleteButton onClick={deleteChar}>Delete</DeleteButton>
      </ButtonContainer>
      {openModify
        ? <Modal onRequestClose={() => updateOpenModify(false)}>
          <ModifyCharacter character={data} onClose={() => updateOpenModify(false)}/>
        </Modal>
        : <></>}
      {openWeapon
        ? <Modal onRequestClose={() => updateOpenWeapon(false)}>
          <AddWeapon charId={charId} onConfirm={() => updateOpenWeapon(false)} charWeaponType={data.type}/>
        </Modal>
        : <></>}
    </Container>
  )
}

export default CharacterProfile
