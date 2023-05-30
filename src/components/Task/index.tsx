import styled from 'styled-components'

import Button from '../Button'
import type { TaskProps } from './Task.types'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.paleYellow};
  border-radius: 35px;
  padding: 15px;
`

const TaskId = styled.h2`
  font-size: 18px;
  color: ${({ theme }) => theme.black};
  width: 100%;
  text-align: start;
`

const Separator = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.black};
`

const TaskContent = styled.h2`
  margin-top: 15px;
  width: 100%;
  text-align: center;
  color: ${({ theme }) => theme.black};
  width: 100%;
`

const DoneButton = styled(Button)`
  margin-top: 15px;
  background: ${({ theme }) => theme.blue};
  width: 50%;
  padding: 25px 30px;
  color:${({ theme }) => theme.white};
`

const Task = ({ task }: TaskProps): JSX.Element => {
  return (
    <Container>
      <TaskId>{task.type} - Task</TaskId>
      <Separator />
      <TaskContent>{task.text}</TaskContent>
      <DoneButton onClick={() => console.log('Done')}>DONE</DoneButton>
    </Container>
  )
}

export default Task
