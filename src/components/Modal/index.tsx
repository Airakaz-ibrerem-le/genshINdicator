import styled from 'styled-components'
import { IoMdClose } from 'react-icons/io'
import { createPortal } from 'react-dom'

import { ModalProps } from './Modal.types'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00000077;
`

const Wrapper = styled.div`
  width: 80vw;
`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const ModalDiv = styled.div`
  background: ${({ theme }) => theme.popUp};
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 15px;
`

const ModalBody = styled.div`
  padding: 10px 0;
`

const ModalTitle = styled.h1`
  font-style: bold;
`

const Modal = ({ onRequestClose, title, children }: ModalProps): JSX.Element => {
  const modalContent = (
    <Container>
      <Wrapper>
        <ModalDiv>
          <Header>
            {title !== undefined ? (<ModalTitle>{title}</ModalTitle>) : null}
            <IoMdClose onClick={onRequestClose} />
          </Header>
          <ModalBody>
            {children}
          </ModalBody>
        </ModalDiv>
      </Wrapper>
    </Container>
  )

  const modal = document.getElementById('modal')

  if (modal === undefined || modal === null) {
    return (<></>)
  }

  return createPortal(modalContent, modal)
}

export default Modal
