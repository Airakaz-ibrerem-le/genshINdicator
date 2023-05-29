import { Inter } from 'next/font/google'
import { useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'

import { GlobalStyles, theme } from '@/styles'

const inter = Inter({ subsets: ['latin'] })

const App = ({ Component, pageProps }: any): JSX.Element => {
  const queryClient = useRef(new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient.current}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps}>

        </Component>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
