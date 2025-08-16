import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import { Activities } from "@/features/activities/activities";

function AppLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Activities />,
      },
      {
        path: "activities",
        element: <Activities />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 - Page Not Found</div>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
