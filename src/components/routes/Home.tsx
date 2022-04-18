import React from "react";
import Editor from "../contents/Editor";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FolderStructure from "./../contents/FolderStructure"

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
						    		<div className="col">
								      	<button className="btn btn-success" id="newFile" style={{background: "#19aa8d"}}>
						                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
											  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
											  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
											</svg>
						                </button>
								    </div>
								    <div className="col">
								    	<button className="btn btn-success" id="newFolder" style={{background: "#19aa8d"}}>
						                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
											  <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
											  <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
											</svg>
						                </button>
								    </div>
								    <div className="col text-right">
								      	<button className="btn btn-success" id="deleteFile" style={{background: "#19aa8d"}}>
						                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
											  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
											  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
											</svg>
						                </button>
								    </div>
						    	</div>
						    	<div className="row">
						    		<FolderStructure />
						    	</div>
						    </div>
					    </div>
					    <div className="col-9">
					   		<div className="row">
					   			<div className="col">
					   				<button className="btn btn-success" id="newFolder" style={{background: "#19aa8d"}}>
							            Run
							        </button>
					   			</div>
					   			<div className="col">
						   			<button className="btn btn-success" id="newFolder" style={{background: "#19aa8d"}}>
							            Save
							        </button>
							    </div>
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