import React from "react";
import FolderStructure from "./FolderStructure";
import { DeleteItemBtn, NewFileBtn, NewFolderBtn } from "./editor-buttons/editor-buttons-index.js";

interface FolderHolderState {
	selectedItem : {[index : string] : any}
}

interface FolderHolderProps {
	selectedFileCallback : (newSelectedFileID : string) => void
}

/**
 * Serves the purpose of the literally just containing the buttons +
 * folderstructure so that the folder structure can pass the selected
 * folder to buttons. Also funny name.
 */

class FolderHolder extends React.Component<FolderHolderProps, FolderHolderState> {
	constructor(props: FolderHolderProps) {
		super(props)

		this.state = {
			selectedItem : []
		}

		this.setSelectedItem = this.setSelectedItem.bind(this)
	}

	setSelectedItem(value : {[index : string] : any}) {
		// if file
		if (value['isLeaf']) {
			this.props.selectedFileCallback(value['key'])	
		}

		this.setState({
			selectedItem : value
		})
	}

    render(): React.ReactNode {
        return (
            <div id="FolderHolder">
            	<div className="container">
			    	<div className="row">
			    		<nav className="navbar navbar-expand-lg">
						  <div className="collapse navbar-collapse" id="navbarText">
						    <ul className="navbar-nav me-auto">
						      <li className="nav-item">
						        <NewFileBtn selectedItem={this.state.selectedItem} />
						      </li>
						      <li className="nav-item">
						        <NewFolderBtn selectedItem={this.state.selectedItem} />
						      </li>
						    </ul>
						    <span className="navbar-text">
						      <DeleteItemBtn selectedItem={this.state.selectedItem} setSelectedItem={this.setSelectedItem} />
						    </span>
						  </div>
						</nav>
			    	</div>
			    	<div className="row">
			    		<FolderStructure selectedItem={this.state.selectedItem} setSelectedItem={this.setSelectedItem} />
			    	</div>
			    </div>
			</div>
        )
    }
};

export default FolderHolder;