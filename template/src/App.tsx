import { RouterProvider } from 'react-router'
import { router } from './pages/router'
import { Providers } from './Providers'

export const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};
