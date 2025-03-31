import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/routes/Home";
import AuthLayout from "@/layouts/AuthLayout";
import SignInPage from "@/routes/SignIn";
import SignUpPage from "@/routes/SignUp";
import ProtectedRoutes from "@/layouts/ProtectedRoutes";
import MainLayout from "./layouts/MainLayout";
import Generate from "./components/Generate";
import Dashboard from "./routes/Dashboard";
import CreateEdit from "./routes/CreateEdit";
import MockInterviewPage from "./routes/MockInterviewPage";
import MockInterviewStartPage from "./routes/MockInterviewStartPage";
import Feedback from "./routes/Feedback";

const App = () => {
  return (
    <div className="">
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          {/*Authentication Layout*/}
          <Route element={<AuthLayout />}>
            <Route path="/signin/*" element={<SignInPage />} />
            <Route path="/signup/*" element={<SignUpPage />} />
          </Route>

          {/*Protected Routes*/}

          <Route
            element={
              <ProtectedRoutes>
                <MainLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/generate" element={<Generate />}>
              <Route index element={<Dashboard />} />
              <Route path=":interviewId" element={<CreateEdit />} />
              <Route
                path="interview/:interviewId"
                element={<MockInterviewPage />}
              />
              <Route
                path="interview/:interviewId/start"
                element={<MockInterviewStartPage />}
              />
              <Route path="feedback/:interviewId" element={<Feedback />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
