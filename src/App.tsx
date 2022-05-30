import React from 'react';
import {
  Routes, Route
} from "react-router-dom";
import { Home, About, Docs, Signup } from "./components/routes/route_index";
import Navbar from "./components/contents/Navbar";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import './App.css';

interface AppState {
	authUser : any
}

interface AppProp {}

class App extends React.Component<AppProp,AppState> {
	constructor(props: AppProp) {
		super(props);

		this.state = {
			authUser : null
		}
	}

	componentDidMount() {
		const auth = getAuth();
		setPersistence(auth, browserSessionPersistence)
		onAuthStateChanged(auth, (user) => {
			if (user) {
		    	this.setState({authUser: user})
			}
		});
	}

	render() : React.ReactNode {
	  return (
	    <div className="App">
	    	<Navbar authUser={this.state.authUser}/>
	      	<Routes>
	        	<Route path="/" element={<Home authUser={this.state.authUser} />} />
	        	<Route path="/home" element={<Home authUser={this.state.authUser} />} />
	        	<Route path="/about" element={<About />} />
	        	<Route path="/docs" element={<Docs />} />
	        	<Route path="/signup" element={<Signup />} />
	      	</Routes>
	    </div>
	  );
	}
}

export default App;
