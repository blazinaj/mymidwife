// Color palette
export const colors = {
  primary: {
    100: '#E6F2F1',
    200: '#C0DFD9',
    300: '#99CCC2',
    400: '#73B9AB',
    500: '#2A9D8F',
    600: '#227E72',
    700: '#1A5E55',
    800: '#133F39',
    900: '#0D1F1C'
  },
  secondary: {
    100: '#FEF4EC',
    200: '#FCE2D0',
    300: '#F9D1B3',
    400: '#F7BF97',
    500: '#F4A261',
    600: '#C3824E',
    700: '#92613A',
    800: '#624127',
    900: '#312013'
  },
  accent: {
    100: '#F0F7F8',
    200: '#DAE9EC',
    300: '#C4DBE0',
    400: '#A8DADC',
    600: '#87AEB0',
    700: '#658284',
    800: '#435758',
    900: '#222B2C'
  },
  success: {
    500: '#38B2AC',
    700: '#2C7A73',
  },
  warning: {
    500: '#F6BD60',
    700: '#D79B2A',
  },
  error: {
    500: '#E76F51',
    700: '#C04B31',
  },
  neutral: {
    white: '#FFFFFF',
    100: '#F7F7F7',
    200: '#E8E8E8',
    300: '#D9D9D9',
    400: '#B0B0B0',
    500: '#8C8C8C',
    600: '#6D6D6D',
    700: '#525252',
    800: '#383838',
    900: '#1A1A1A',
    black: '#000000',
  }
};

// Typography
export const typography = {
  fontFamily: {
    heading: 'Montserrat-Bold',
    headingMedium: 'Montserrat-SemiBold',
    body: 'Lato-Regular',
    bodyBold: 'Lato-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.2,  // For headings
    normal: 1.5,  // For body text
  }
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

// Borders and Shadows
export const borders = {
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  width: {
    thin: 1,
    normal: 2,
    thick: 3,
  },
};

export const shadows = {
  sm: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};