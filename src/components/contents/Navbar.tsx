import React from "react";
import LoginButton from "./LoginButton"

interface NavbarState {}

interface NavbarProps {
	isLoggedIn: boolean
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
	loggedIn() : React.ReactNode {
		const userStyle = {
			marginRight: '20px',
		}

		return (
			<li className="navbar-item">
			    <span className="navbar-text" style={userStyle}>Username</span>
			    <button className="btn btn-success my-2 my-sm-0" style={{background: "#19aa8d"}}>Logout</button>
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

		let navbarLogin;
		if (this.props.isLoggedIn) {
			navbarLogin = this.loggedIn()
		} else {
			navbarLogin = this.loggedOut()
		}

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
