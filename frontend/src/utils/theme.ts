import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      link: { main: string };
      overlay: { loading: { main: string } };
      code: { main: string; dark: string };
      paper: {
        header: { main: string };
        background: { main: string; disabled: string };
      };
      ai: { main: string };
      status: {
        success: { text: string; background: string };
        warning: { text: string; background: string };
        info: { text: string; background: string };
        error: { text: string; background: string };
        neutral: { text: string; background: string };
        purple: { text: string; background: string };
        pink: { text: string; background: string };
        yellow: { text: string; background: string };
      };
      sidebar: {
        background: string;
        item: { selected: { background: string } };
      };
      logo: { background: string };
    };
  }
  interface ThemeOptions {
    custom?: Partial<Theme['custom']>;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f46e5',
      contrastText: '#ffffff',
      dark: '#3730a3',
      light: '#818cf8',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#334155',
    },
    text: { secondary: '#64748b' },
  },
  custom: {
    link: { main: '#0ea5e9' },
    overlay: { loading: { main: 'rgba(255, 255, 255, 0.75)' } },
    code: { main: '#f8fafc', dark: '#e2e8f0' },
    paper: {
      header: { main: '#f1f5f9' },
      background: { main: '#ffffff', disabled: '#f8fafc' },
    },
    ai: { main: '#d946ef' },

    status: {
      success: { text: '#166534', background: '#dcfce7' },
      warning: { text: '#9a3412', background: '#ffedd5' },
      info: { text: '#075985', background: '#e0f2fe' },
      error: { text: '#991b1b', background: '#fee2e2' },
      neutral: { text: '#334155', background: '#f1f5f9' },

      purple: { text: '#5b21b6', background: '#f3e8ff' },
      pink: { text: '#9d174d', background: '#fce7f3' },
      yellow: { text: '#854d0e', background: '#fef9c3' },
    },
    sidebar: {
      background: '#0f172a',
      item: { selected: { background: 'rgba(255, 255, 255, 0.1)' } },
    },
    logo: { background: '#ffffff' },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
  },
});

export default theme;
