import styled from 'styled-components'

import { FooterButtonProps } from './FooterButton.types'

const Container = styled.div`
  outline: 1px solid ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.backgroundColor};
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 32px;
`

const FooterButton = ({ title }: FooterButtonProps): JSX.Element => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  )
}

export default FooterButton
