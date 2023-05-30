import { createGlobalStyle, type DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  backgroundColor: '#091739',
  paleBlue: '#9BB7FF',
  paleYellow: '#ECE0C1',
  borderColor: '#FFFFFF',
  black: '#000000',
  white: '#FFFFFF',
  navyBlue: '#232D41',
  confirmGreen: '#258F27',
  popUp: '#28374f',
  delete: '#DB3623',
  blue: '#2A68C6'
}

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter';
  }
`
