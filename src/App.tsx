import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PublicLayout from "@/layouts/PublicLayout"
import Home from "@/routes/Home"
import AuthLayout from "@/layouts/AuthLayout"
import SignInPage from "./routes/SignIn"
import SignUpPage from "./routes/SignUp"


const App = () => {
  return (
    <div className="">
      <Router future={{
        v7_startTransition: true, v7_relativeSplatPath: true,
      }}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          {/*Authentication Layout*/}
          <Route element={<AuthLayout />}>
            <Route path="/signin/*" element={<SignInPage />} />
            <Route path="/signup/*" element={<SignUpPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App