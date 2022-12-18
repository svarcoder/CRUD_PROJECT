import "./App.css";
import HomeRoute from "./HomeRoute/HomeRoute";
import { BrowserRouter } from "react-router-dom";
import MainProvider from "./Component/Context/Provider";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<MainProvider>
					<HomeRoute />
				</MainProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
