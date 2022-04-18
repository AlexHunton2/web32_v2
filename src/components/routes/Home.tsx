import React from "react";
import Editor from "../contents/Editor";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FolderStructure from "./../contents/FolderStructure";
import { DeleteItemBtn, NewFileBtn, NewFolderBtn, RunBtn, SaveBtn } from "./../contents/editor-buttons/editor-buttons-index.js";

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
				<br />
				<div className="container">
				  	<div className="row schedule">
					    <div className="col overflow-auto">
					    	<div className="container">
						    	<div className="row">
						    		<nav className="navbar navbar-expand-lg">
									  <div className="collapse navbar-collapse" id="navbarText">
									    <ul className="navbar-nav mr-auto">
									      <li className="nav-item">
									        <NewFileBtn />
									      </li>
									      <li className="nav-item">
									        <NewFolderBtn />
									      </li>
									    </ul>
									    <span className="navbar-text">
									      <DeleteItemBtn />
									    </span>
									  </div>
									</nav>
						    	</div>
						    	<div className="row">
						    		<FolderStructure />
						    	</div>
						    </div>
					    </div>
					    <div className="col-9">
					   		<div className="row">
					   			<nav className="navbar navbar-expand-lg">
								  <div className="collapse navbar-collapse" id="navbarText">
								    <ul className="navbar-nav me-auto"></ul>
								    <span className="navbar-item">
								    	<RunBtn />
								    </span>
								    <span className="navbar-item">
								    	<SaveBtn />
								    </span>
								  </div>
								</nav>
					   		</div>
					      	<div className="row">
					      		<Editor />
					      	</div>
					    </div>
					</div>
				</div>
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