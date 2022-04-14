import React from "react";
import Editor from "../contents/Editor";

interface HomeState {}

interface HomeProps {
	isLoggedIn : boolean
}

class Home extends React.Component<HomeProps, HomeState> {
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
    	let homePage;
    	if (this.props.isLoggedIn) {
    		homePage = this.loggedIn()
    	} else {
    		homePage = this.loggedOut()
    	}
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