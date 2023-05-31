import styled from 'styled-components'
import { BsPlus } from 'react-icons/bs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Modal from '@/components/Modal'
import Button from '@/components/Button'
import SearchBar from '@/components/SearchBar'
import AddCharacter from '@/components/AddCharacter'
import CharacterCard from '@/components/CharacterCard'
import { Character } from '@/queries/Characters/Characters.types'
import { WeaponType } from '@/queries/Weapons/Weapons.types'
import { useFetchOwnedCharQuery } from '@/queries/Characters'

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundColor};
  gap: 10px;
`

const ButtonSection = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 5%;
    width: 90%;
    height: 2px;
    background-color: black;
  }
`

const CharacterContainer = styled.div`
  gap: 15px;
  width: 100%;
  padding: 5%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`

const AddButton = styled(Button)`
  width: 80px;
  height: 80px;
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
  type: WeaponType.CLAYMORE,
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
  }]
}]

const CollectionTab = (): JSX.Element => {
  const [openAddChar, setOpenAddChar] = useState<boolean>()
  const [searchText, updateSearchText] = useState<string>('')
  const { data } = useFetchOwnedCharQuery()
  const router = useRouter()

  const filterCharacter = (chars: Character[]): Character[] => {
    if (searchText === '') {
      return chars
    }
    return chars.filter(val => val.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
  }
  return (
    <Container>
      <ButtonSection>
        <Button onClick={() => console.log('Sorting...')}>
          SORT
        </Button>
        <SearchBar onChange={(val) => updateSearchText(val)} />
      </ButtonSection>
      <CharacterContainer>
        {data !== undefined
          ? filterCharacter(data).map(({ id, path }) => (<CharacterCard onClick={() => router.push(`/Character/${id}`)} key={id} cardPath={`/${path}`} id={id} />))
          : <></>
        }
        <AddButton onClick={() => setOpenAddChar(true)}>
          <BsPlus size={80} width={80} height={80}/>
        </AddButton>
      </CharacterContainer>
      {openAddChar
        ? (<Modal onRequestClose={() => setOpenAddChar(false)}>
          <AddCharacter onConfirm={() => setOpenAddChar(false)} />
        </Modal>)
        : (<></>)}
    </Container>
  )
}

export default CollectionTab
