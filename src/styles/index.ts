import { createGlobalStyle, type DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  backgroundColor: '#034775',
  paleBlue: '#2AA2E3',
  paleYellow: '#FBE297',
  borderColor: '#FFFFFF',
  black: '#FFFFFF',
  white: '#000000',
  navyBlue: '#012D4A',
  confirmGreen: '#258F27',
  popUp: '#28374f'
}

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter';
  }
`