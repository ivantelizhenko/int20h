import { RootLayout } from 'components/layouts/RootLayout';
import { lazy } from 'react';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

const AppLayout = lazy(() => import('components/layouts/AppLayout'));

const Orders = lazy(() => import('components/orders/Orders'));
const AddOrder = lazy(() => import('components/orders/AddOrder'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<div>RootBoundary</div>}>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/add-order" element={<AddOrder />} />
        <Route path="/users" element={<div>users</div>} />
      </Route>

      {/* <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
      </Route> */}
    </Route>,
  ),
);

export default router;
