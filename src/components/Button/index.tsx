import styled from 'styled-components'

import { ButtonProps } from './Button.styles'

const Container = styled.div`
  border-radius: 24px;
  background-color: ${({ theme }) => theme.paleBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 5px;
  height: 30px;
`

const Button = ({ onClick, children, ...props }: ButtonProps): JSX.Element => {
  return (
    <Container onClick={onClick} {...props}>
      {children}
    </Container>
  )
}

export default Button
