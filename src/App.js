import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/main";
import Signup from "./components/signup";
import Signin from "./components/signin";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/signin" exact element={<Signin />} />
			<Route path="/" element={<Navigate replace to="/signin" />} />
		</Routes>
	);
}

export default App;