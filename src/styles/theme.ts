const colors = {
  transparent: 'transparent',
  white: '#FFFFFF',
  whiteF6F8FD: '#F6F8FD',
  white10: '#FFFFFF1A',

  errorColor: '#FF4D4D',

  transparentGrey: 'rgba(128,128,128,0.5)',

  black: '#000',
  black090B17: '#090B17',

  // Input Fields Color
  authLabelColor: '#0D0D12',
  authDesColor: '#666D80',
  textColor: '#0D0D12',
  placeholderTxtColor: '#A4ACB9',
  inputBorderColor: '#808080',

  btnColor: '#0D0D12',

  iconColor: '#2D3748',

  primaryColor: '#905E26',
  primaryBackground: '#F8FAFB',

  appColor: '#253174',
  lightAppColor: '#C5CBEC',

  gradientColor: '#F5EC9B',

  greyF8FAFC: '#F8FAFC',
  greyE6E6E6: '#E6E6E6',
  grey1A1A19: '#1A1A19',

  green2FB344: '#2FB344',
};

export const fontNames = {
  Inter: 'Inter',
};

export const fontFamily = (font_name: string, fw: string) => {
  switch (fw) {
    case '500':
      return `${font_name}-Medium`;
    case '600':
      return `${font_name}-SemiBold`;
    case 'bold':
      return `${font_name}-Bold`;
    case 'extra':
      return `${font_name}-ExtraBold`;
    case 'italic':
      return `${font_name}-Italic`;
    default:
      return `${font_name}-Regular`;
  }
};

export {colors};
