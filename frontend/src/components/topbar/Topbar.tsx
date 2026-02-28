import { useLocation } from 'react-router-dom';

import { AppBar, Toolbar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const TopBar = () => {
  const theme = useTheme();
  const location = useLocation();

  const lastSegment = location.pathname.split('/').filter(Boolean).at(-1) || '';

  const pageName = lastSegment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <AppBar
      position="sticky"
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          color="text.primary"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          {pageName}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
