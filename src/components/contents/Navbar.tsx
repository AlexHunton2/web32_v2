import React from "react";
import LoginButton from "./LoginButton";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

interface NavbarState {}

interface NavbarProps {
	authUser?: any
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
	constructor(props: NavbarProps) {
		super(props)
		this.logOut = this.logOut.bind(this)
	}


	logOut() {
		const auth = getAuth();
		signOut(auth).then(() => {
		  // Sign-out successful.
		}).catch((error) => {
		  const error_message = error.message;
		  console.log(error_message);
		});
		window.location.reload();
	}

	loggedIn(username : string) : React.ReactNode {
		const userStyle = {
			marginRight: '20px',
		}
		return (
			<li className="navbar-item">
			    <span className="navbar-text" style={userStyle}>{username}</span>
			    <button className="btn btn-success my-2 my-sm-0" onClick={this.logOut} style={{background: "#19aa8d"}}>Logout</button>
			</li>
		)
	}

	loggedOut() : React.ReactNode {
		return (
			<li className="navbar-item dropdown">
			    <LoginButton />
			</li>
		)
	}

	render() : React.ReactNode {
		const navStyle = {
			background: "#4c4ce8"
		}
		let username = "NULL"
		if (this.props.authUser) {
			username = this.props.authUser.email;
		}

		let navbarLogin = this.props.authUser ? this.loggedIn(username) : this.loggedOut();
		return (
			<nav className="navbar navbar-expand-lg navbar-dark" style={navStyle}>
			  <div className="container-fluid" id="navbar-text">
			    <a className="navbar-brand" href="/home">Web32</a>
			    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			      <span className="navbar-toggler-icon"></span>
			    </button>
			    <div className="collapse navbar-collapse" id="navbarText">
			      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
			      	<li className="nav-item">
			          <a className="nav-link active" aria-current="page" href="/docs">Docs</a>
			        </li>
			        <li className="nav-item">
			          <a className="nav-link active" aria-current="page" href="/about">About</a>
			        </li>
			      </ul>
			      <ul className="navbar-nav">
			      	{navbarLogin}
			      </ul>
			    </div>
			  </div>
			</nav>
		)
	}
}

export default Navbar;
