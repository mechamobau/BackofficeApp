import {} from 'styled-components';
import {ThemeType} from './theme'; // Import type from above file
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
export type ThemeType = typeof light; // This is the type definition for my theme object.
