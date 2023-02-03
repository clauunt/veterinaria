import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#006D77",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        white: {
          100: "#ffffff",
          200: "#ffffff",
          300: "#ffffff",
          400: "#ffffff",
          500: "#ffffff",
          600: "#cccccc",
          700: "#999999",
          800: "#666666",
          900: "#333333"
        },
        darkcyan: {
          100: "#cce2e4",
          200: "#99c5c9",
          300: "#66a7ad",
          400: "#338a92",
          500: "#006d77",
          600: "#00575f",
          700: "#004147",
          800: "#002c30",
          900: "#001618"
        },
        mediumaquamarine: {
          100: "#e6f3f2",
          200: "#cde8e5",
          300: "#b5dcd8",
          400: "#9cd1cb",
          500: "#83c5be",
          600: "#699e98",
          700: "#4f7672",
          800: "#344f4c",
          900: "#1a2726"
        },
        lightcyan: {
          100: "#fbfdfe",
          200: "#f8fbfd",
          300: "#f4fafb",
          400: "#f1f8fa",
          500: "#edf6f9",
          600: "#bec5c7",
          700: "#8e9495",
          800: "#5f6264",
          900: "#2f3132"
        },

        green: {
          100: "#d5e5d6",
          200: "#abcbad",
          300: "#82b184",
          400: "#58975b",
          500: "#2e7d32",
          600: "#256428",
          700: "#1c4b1e",
          800: "#123214",
          900: "#09190a"
        },
        blue: {
          100: "#d1e4f6",
          200: "#a3c8ed",
          300: "#75ade4",
          400: "#4791db",
          500: "#1976d2",
          600: "#145ea8",
          700: "#0f477e",
          800: "#0a2f54",
          900: "#05182a"
        },
        red: {
          100: "#fdd9d7",
          200: "#fbb4af",
          300: "#f88e86",
          400: "#f6695e",
          500: "#f44336",
          600: "#c3362b",
          700: "#922820",
          800: "#621b16",
          900: "#310d0b"
        },
        orange: {
          100: "#fbe2cc",
          200: "#f8c49a",
          300: "#f4a767",
          400: "#f18935",
          500: "#ed6c02",
          600: "#be5602",
          700: "#8e4101",
          800: "#5f2b01",
          900: "#2f1600"
        },
        cyan: {
          100: "#d4f0fd",
          200: "#a9e2fb",
          300: "#7fd3fa",
          400: "#54c5f8",
          500: "#29b6f6",
          600: "#2192c5",
          700: "#196d94",
          800: "#104962",
          900: "#082431"
        },  
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.mediumaquamarine[500],
            },
            secondary: {
              main: colors.mediumaquamarine[500],
            },
            neutral: {
              dark: colors.mediumaquamarine[700],
              main: colors.mediumaquamarine[500],
              light: colors.mediumaquamarine[100],
            },
            background: {
              default: colors.mediumaquamarine[500],
            },
          }
        : {
            // palette values for light mode
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            primary: {
              main: colors.darkcyan[500],
            },
            secondary: {
              main: colors.mediumaquamarine[500],
            },
            tertiary: {
              main: colors.lightcyan[500],
            },

            default: {
              main: colors.grey[900],
            },
            edit: {
              main: colors.blue[500],
            },
            info: {
              main: colors.cyan[500],
            },
            warning: {
              main: colors.orange[500],
            },
            success: {
              main: colors.green[500],
            },
            danger: {
              main: colors.red[500],
            },
            background: {
              default: "#fcfcfc",
            },
      }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      color:"black",
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        color:"black",
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
        color:"black",
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
        color:"black",
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
        color:"black",
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        color:"black",
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        color:"black",
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
