import React from "react";
import Editor from "./Editor";
import FolderHolder from "./FolderHolder";
import { RunBtn, SaveBtn } from "./editor-buttons/editor-buttons-index.js";
import CloudFileAPI from "./../../utils/CloudFileAPI"
import FileStructureAPI from "./../../utils/FileStructureAPI"
import { createError } from "./../routes/Home";

interface BrowserState {
	selectedFileContentID : string // keyword here is "file"
}

interface BrowserProps {}

const ERROR_FILE_CONTENT = "UNKOWN ISSUE: FAILED TO LOAD FILE CORRECTLY"
const DEFAULT_FILE_CONTENT = "Open a file to view contents."

class Browser extends React.Component<BrowserProps, BrowserState> {
	private editorRef : React.RefObject<Editor>;

	constructor(props : BrowserProps) {
		super(props);

		this.state = {
			selectedFileContentID : "",
		}

		this.editorRef = React.createRef<Editor>();

		this.saveCallback = this.saveCallback.bind(this);
		this.selectedFileCallback = this.selectedFileCallback.bind(this);
	}

	// called when save button is presssed
	saveCallback() : Promise<void> {
		const currentEditor = this.editorRef.current;
		const file_content_id = this.state.selectedFileContentID;
		return new Promise((resolve, reject) => {
			if (currentEditor && file_content_id) {
				const content = currentEditor.state.content;
				const uploadPromise = CloudFileAPI.getInstance().uploadContents(content, file_content_id);
				uploadPromise
				.then(() => {
					resolve();
				})
				.catch((error) => {
					createError("Uh oh!", error.toString(), "danger");
					resolve();
				})
			}
		})
		
	}

	// called when a file is selected
	selectedFileCallback(newSelectedFileID : string) {
		// get content id from selectedFileID
		const file_content_id = FileStructureAPI.getInstance().getFileContentID(newSelectedFileID);

		// update current file id so safe save can occur

		this.setState({
			selectedFileContentID : file_content_id
		})

		if (!file_content_id) {
			const currentEditor = this.editorRef.current;
			if (currentEditor) {
				currentEditor.setState({
						content : DEFAULT_FILE_CONTENT,
						readOnly : true,
				}) 
			}
			return; 
		}
		

		// update content on editor
		var content_promise = CloudFileAPI.getInstance().readContents(file_content_id);
		content_promise
		.then((content : string) => {			
			if (!content) {
				content = ERROR_FILE_CONTENT
			}

			const currentEditor = this.editorRef.current;
			
			if (currentEditor) {
				currentEditor.setState({
					content : content,
					readOnly : (!content),
				})
			}
		})
		.catch((error) => {
			createError("Uh Oh!", error.toString(), "danger");
		})
	}


    render(): React.ReactNode {
        return (
            <div id="Browser">
            	<br />
				<div className="container">
				  	<div className="row schedule">
					    <div className="col overflow-auto">
					    	<FolderHolder selectedFileCallback={this.selectedFileCallback} />
					    </div>
					    <div className="col-9">
					   		<div className="row no-gutter" >
					   			<nav className="navbar navbar-expand-lg">
								  <div className="collapse navbar-collapse" id="navbarText">
								  	<span className="navbar-item">
								    	{this.state.selectedFileContentID && <SaveBtn saveCallback={this.saveCallback} />}
								    </span>
								    <ul className="navbar-nav me-auto"></ul>
								    <span className="navbar-item">
								    	<RunBtn />
								    </span>
								  </div>
								</nav>
					   		</div>
					      	<div className="row">
					      		<Editor ref={this.editorRef} />
					      	</div>
					    </div>
					</div>
				</div>
			</div>
        )
    }
};

export default Browser;