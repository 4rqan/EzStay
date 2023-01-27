import { Link, Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import SignupPage from "../pages/SignupPage"

const AppRouter = () => {
  return (
    <>
    <div> 
        <ul>
            <li>
                <Link to="">Home</Link>
                </li>
                <li>
                <Link to="/login">Login</Link>
                </li>
                <li>
                <Link to="/signup">Signup</Link>
                </li>
        </ul>
    </div>
    <Routes>
        <Route path={""} element={<HomePage/>}/>
        <Route path={"/login"} element={<LoginPage/>}/>
        <Route path={"/signup"} element={<SignupPage/>}/>
    </Routes>
    </>
  )
}

export default AppRouter