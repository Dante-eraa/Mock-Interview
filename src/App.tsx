import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PublicLayout from "@/layouts/PublicLayout"
import Home from "@/routes/Home"
import AuthLayout from "@/layouts/AuthLayout"


const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
          </Route>
          {/*Authentication Layout*/}
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App