import { theme } from '@chakra-ui/core';

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      100: '#F0FFFF',
      200: '#27EF96',
      300: '#10DE82',
      400: '#0EBE6F',
      500: '#1C86EE',
      600: '#1874CD',
      700: '#104E8B',
      800: '#26466D',
      900: '#344152',
    },
    // primary: {
    //   100: '#E5FCF1',
    //   200: '#27EF96',
    //   300: '#10DE82',
    //   400: '#0EBE6F',
    //   500: '#0CA25F',
    //   600: '#0A864F',
    //   700: '#086F42',
    //   800: '#075C37',
    //   900: '#064C2E',
    // },
  },
};

export default customTheme;
