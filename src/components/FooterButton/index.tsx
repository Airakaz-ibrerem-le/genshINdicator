import styled from 'styled-components'

import { FooterButtonProps } from './FooterButton.types'

interface FooterButtonStyle {
  isActive: boolean
}

const Container = styled.div <FooterButtonStyle>`
  outline: 1px solid ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.backgroundColor};
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isActive }) => isActive ? 1 : 0.5};
`

const Title = styled.h1`
  font-size: 32px;
  color: white;
`

const FooterButton = ({ title, isActive, onClick }: FooterButtonProps): JSX.Element => {
  return (
    <Container isActive={isActive} onClick={onClick}>
      <Title>{title}</Title>
    </Container>
  )
}

export default FooterButton
