import React from "react";
import Browser from "../contents/Browser";
import ErrorHandler from "../contents/ErrorHandler"
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface HomeState {}

interface HomeProps {
	authUser?: any
}

var errorHandlerRef : React.RefObject<ErrorHandler> = React.createRef<ErrorHandler>();

class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props)
	}

	loggedIn() : React.ReactNode {
		return (
			<div>
				<ErrorHandler ref={errorHandlerRef} />
				<Browser />
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

export function createError(title : string, message : string, type : string) {
	if (errorHandlerRef.current)
		errorHandlerRef.current.openError(title, message, type)
}

export default Home