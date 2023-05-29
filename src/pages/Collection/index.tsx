import styled from 'styled-components'
import { BsSearch, BsPlus } from 'react-icons/bs'

import Button from '@/components/Button'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import CharacterCard from '@/components/CharacterCard'
import { useFetchOwnedCharQuery } from '@/queries/Characters'
import { useState } from 'react'
import Modal from '@/components/Modal'
import AddCharacter from '@/components/AddCharacter'
import { Character } from '@/queries/Characters/Characters.types'
import FooterButton from '@/components/FooterButton'

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
`

const AddButton = styled(Button)`
  width: 80px;
  height: 80px;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`

// const val: TrueObject = { obj: "toto", id: 1 }
// const { obj } = val

// const squared (val) => val.id * val.id
// const squared ({ id }: TrueObject) => id * id
// squared({ obj: "tata", id: 42 })

// `My variable is : ${(variable) => { return variable }}` -> f"My variable is : {variable}"

const Collection = (): JSX.Element => {
  const [openAddChar, setOpenAddChar] = useState<boolean>()
  const [searchText, updateSearchText] = useState<string>("")
  const { data } = useFetchOwnedCharQuery()

  const filterCharacter = (chars: Character[]): Character[] => {
    if (searchText === "") {
      return chars
    }
    return chars.filter(val => val.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
  }
  return (
    <Container>
      <Header title='My Collection'/>
      <ButtonSection>
        <Button onClick={() => console.log('Sorting...')}>
          SORT
        </Button>
        <SearchBar onChange={(val) => updateSearchText(val)} />
      </ButtonSection>
      <CharacterContainer>
        {data !== undefined
          ? filterCharacter(data).map(({ id, path }) => (<CharacterCard cardPath={`/${path}`} id={id} />))
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
      <Footer>
        <FooterButton title='Collection' />
        <FooterButton title='Daily Tasks' />
      </Footer>
    </Container>
  )
}

export default Collection
