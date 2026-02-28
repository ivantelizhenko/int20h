import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';

import PageLoader from 'components/common/loaders/PageLoader';
import theme from 'utils/theme';
import TopBar from 'components/topbar/Topbar';
import Sidebar from 'components/sidebar/Sidebar';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          backgroundColor: theme.custom.paper.background.main,
          display: 'flex',
          flexDirection: 'column',
          scrollbarGutter: 'stable',
        }}
      >
        <TopBar />
        <Box
          sx={{
            p: 3,
            pt: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
