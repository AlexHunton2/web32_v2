import React from "react";
import Editor from "../contents/Editor";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface HomeState {}

interface HomeProps {
	authUser?: any
}

class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props)
	}

	loggedIn() : React.ReactNode {
		return (
			<div>
				<h1>Logged-In</h1>
				<Editor />
			</div>
		)
	}

	loggedOut() : React.ReactNode {
		return (
			<div>
				<h1>Logged-Out</h1>
			</div>
		)
	}

    render(): React.ReactNode {
    	let homePage = this.props.authUser ? this.loggedIn() : this.loggedOut();

        return (
            <div id="home">
            	<div id="home-content">
	                {homePage}
	            </div>
			</div>
        )
    }
};

export default Home;