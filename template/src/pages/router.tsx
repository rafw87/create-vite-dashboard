import { createRoutesFromElements, Outlet, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout';
import { MainPage } from './main';
import { ExamplePage } from './example';
import { SettingsPage } from './settings';

const routes = createRoutesFromElements(
  <>
    <Route
      element={
        <Layout>
          <Outlet />
        </Layout>
      }
    >
      <Route index Component={MainPage} />
      <Route path="/example" Component={ExamplePage} />
      <Route path="/settings" Component={SettingsPage} />
    </Route>
  </>,
);

export const router = createBrowserRouter(routes);
