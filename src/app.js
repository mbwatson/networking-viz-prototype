import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import { HomeView, RawDataView, NotFoundView } from "./views";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

const menuOptions = [
  {
    path: "/",
    label: "Graph",
    view: <HomeView />,
  },
  {
    path: "/data",
    label: "Data",
    view: <RawDataView />,
  },
];

//

export const App = () => {
  return (
    <Fragment>
      <Header menuLinks={menuOptions} />

      <main>
        <Routes>
          {
            // we'll build the routes from the main menu items.
            // note this implementation only supports a flat,
            // one-level navigation structure.
            menuOptions.map(({ path, view, label }) => (
              <Route key={`route-${label}`} path={path} element={view} />
            ))
          }
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>

      <Footer />
    </Fragment>
  );
};
