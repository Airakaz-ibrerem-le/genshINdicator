import styled from 'styled-components'
import { useMemo, useState } from 'react'

import Header from '../Header'
import FooterButton from '../FooterButton'
import { TabHolderProps } from './TabHolder.types'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundColor};
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`

const TabHolder = ({ tabs, initialTab }: TabHolderProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(initialTab ?? tabs[0].key) 
  const current = useMemo(() => {
    return tabs.find(({ key }) => key === activeTab) ?? {
      title: 'Unknown',
      key: 'unknown',
      content: <></>
    }
  }, [activeTab, tabs])

  return (
    <Container>
      <Header title={current?.title} />
      {current.content}
      <Footer>
        {tabs.map(({ title, key }) => (
          <FooterButton
            key={key}
            title={title}
            isActive={key === activeTab}
            onClick={() => setActiveTab(key)} />
        ))}
      </Footer>
    </Container>
  )
}

export default TabHolder
