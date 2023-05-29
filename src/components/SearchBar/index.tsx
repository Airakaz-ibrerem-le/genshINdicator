import styled from 'styled-components'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'

import Button from '@/components/Button'

const Container = styled.div`
  display: flex;
  gap: 10px;
`

interface SearchInputProps {
  open: boolean
}

const SearchInput = styled.input <SearchInputProps>`
  border-radius: 15px;
  background: ${({ theme }) => theme.paleBlue};
  display: ${({ open }) => open ? 'block' : 'none'};
`

const SearchBar = ({ onChange }: SearchBarProps): JSX.Element => {
  const [isOpen, updateIsOpen] = useState<boolean>(false)
  return (
    <Container>
      <SearchInput onChange={(e) => onChange(e.target.value)} open={isOpen} />
      <Button onClick={() => updateIsOpen(!isOpen)}>
        <BsSearch />
      </Button>
    </Container>
  )
}

export default SearchBar
