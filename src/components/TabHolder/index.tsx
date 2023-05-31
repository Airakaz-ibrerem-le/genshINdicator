import styled from 'styled-components'
import { useMemo, useState } from 'react'

import Header from '../Header'
import FooterButton from '../FooterButton'
import { TabHolderProps } from './TabHolder.types'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundColor};
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
`

const ContentWrapper = styled.div`
  padding-bottom: 10vh;
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
      <ContentWrapper>
        {current.content}
      </ContentWrapper>
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
