import styled from 'styled-components'

import CharacterCard from '../CharacterCard'
import { useAddCharacter, useFetchAvailableCharQuery } from '@/queries/Characters'
import type { AddCharacterProps } from './AddCharacter.types'
import Button from '../Button'

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

const AddCharacter = ({ onConfirm }: AddCharacterProps): JSX.Element => {
  const { data } = useFetchAvailableCharQuery()
  const { mutateAsync } = useAddCharacter()

  return (
    <Container>
      <AvailableContainer>
        {data !== undefined
          ? data.map((char) => (<CharacterCard key={char.id} cardPath={`/${char.path}`} id={char.id} onClick={async () => await mutateAsync(char) } />))
          : <></>
        }
      </AvailableContainer>
    </Container>
  )
}

export default AddCharacter
