import styled from 'styled-components'

import { HeaderProps } from './Header.types'

const Container = styled.div`
  background: ${({ theme }) => theme.paleBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
`

const HeaderTitle = styled.h1`
  color: white;
  text-align: center;
  font-size: 3rem;
`

const Header = ({ title }: HeaderProps): JSX.Element => {
  return (
    <Container>
      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  )
}

export default Header
