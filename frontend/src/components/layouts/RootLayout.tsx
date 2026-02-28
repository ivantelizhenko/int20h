import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CssBaseline } from '@mui/material';
import PageLoader from 'components/common/loaders/PageLoader';

export const RootLayout = () => {
  return (
    <>
      <CssBaseline />
      <Suspense fallback={<PageLoader sx={{ height: '100vh' }} />}>
        <Outlet />
      </Suspense>
    </>
  );
};
