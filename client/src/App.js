import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
};

export default App;
