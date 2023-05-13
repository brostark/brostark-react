import { createTheme, PaletteColorOptions } from "@mui/material/styles";


const secondary: PaletteColorOptions = {
  dark: "#c23616",
  main: "#e84118",
  light: "#e84118",
  contrastText: "#fff",
}

const primary: PaletteColorOptions = {
  light: "#48dbfb",
  main: "#34ace0",
  dark: "#227093",
  contrastText: "#fff",
}

const info: PaletteColorOptions = {
  main: "#fa983a",
  dark: "#e58e26",
  light: "#f6b93b",
  contrastText: "#fff",
}


const black: string = "rgba(76, 78, 100, 0.87)";


export const theme = createTheme({
  palette: {
    info,
    primary,
    secondary,
    common: {
      black,
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "Poppins",
    ].join(", "),
    fontSize: 12,
    htmlFontSize: 12,
    fontWeightRegular: 300,
    h1: {
      fontSize: 56,
      fontWeight: 900,
      lineHeight: "68px",
      fontFamily: "Poppins",

      '@media (max-width: 600px)': {
        fontSize: 36,
      },
    },
    h2: {
      fontSize: 36,
      lineHeight: "43px",
      fontWeight: 300,
      fontFamily: "Inter",

      '@media (max-width: 600px)': {
        fontSize: 28,
      },
    },
    h3: {
      fontSize: 28,
      fontWeight: 500,
      lineHeight: "29px",
      fontFamily: "Inter",

      '@media (max-width: 600px)': {
        fontSize: 21,
      },
    },
    h4: {
      fontSize: 21,
      fontWeight: 700,
      lineHeight: "36px",
      fontFamily: "Inter",

      '@media (max-width: 600px)': {
        fontSize: 18,
      },
    },
    h5: {
      fontWeight: 400,
      fontSize: 21,
      lineHeight: "20px",
      fontFamily: "Inter",
    },
    h6: {
      fontWeight: 100,
      fontSize: 16,
      lineHeight: "30px",
      fontFamily: "Poppins",
    },
    body2: {},
    body1: {
      fontSize: 16,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      opacity: 0.8,
      fontSize: 16,
      width: "100%",
      fontWeight: 100,
    },
    caption: {
      display: "block",
      fontSize: 14,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          color: black,
          // padding: 16,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          transition: "color 0.2s ease-in-out",

          "&:hover": {
            color: primary.dark,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(20px)",
          color: primary.dark,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
