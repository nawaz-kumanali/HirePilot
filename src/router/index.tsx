import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Interview from "../pages/Interview/Interview";
import Jobs from "../pages/Jobs/Jobs";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Training from "../pages/Training/Traning";
import Courses from "../pages/Courses/Courses";
import CoursePage from "../pages/Courses/Course/Course";
import NotFound from "../pages/NotFound/NotFound";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Protected routes
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/training",
        element: (
          <ProtectedRoute>
            <Training />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courses",
        element: (
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        ),
      },
      {
        path: "/courses/:id",
        element: (
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/interview",
        element: (
          <ProtectedRoute>
            <Interview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },

    ]


  },
  {
    path: "*",
    element: <NotFound />
  }

]);
