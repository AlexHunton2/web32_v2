import React from "react";
import Editor from "./Editor";
import FolderStructure from "./FolderStructure";
import { DeleteItemBtn, NewFileBtn, NewFolderBtn, RunBtn, SaveBtn } from "./editor-buttons/editor-buttons-index.js";

interface BrowserState {}

interface BrowserProps {}

class Browser extends React.Component<BrowserProps, BrowserState> {
    render(): React.ReactNode {
        return (
            <div id="Browser">
            	<br />
				<div className="container">
				  	<div className="row schedule">
					    <div className="col overflow-auto">
					    	<div className="container">
						    	<div className="row">
						    		<nav className="navbar navbar-expand-lg">
									  <div className="collapse navbar-collapse" id="navbarText">
									    <ul className="navbar-nav me-auto">
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
};

export default Browser;