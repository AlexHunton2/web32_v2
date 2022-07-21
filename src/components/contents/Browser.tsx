import React from "react";
import Editor from "./Editor";
import FolderHolder from "./FolderHolder";
import { RunBtn, SaveBtn } from "./editor-buttons/editor-buttons-index.js";
import CloudFileAPI from "./../../utils/CloudFileAPI"
import FileStructureAPI from "./../../utils/FileStructureAPI"

interface BrowserState {
	selectedFileContentID : string // keyword here is "file"
}

interface BrowserProps {}

const DEFAULT_FILE_CONTENT = "UNKOWN ISSUE: FAILED TO LOAD FILE CORRECTLY"

class Browser extends React.Component<BrowserProps, BrowserState> {
	private editorRef : React.RefObject<Editor>;

	constructor(props : BrowserProps) {
		super(props);

		this.state = {
			selectedFileContentID : ""
		}

		this.editorRef = React.createRef<Editor>();

		this.saveCallback = this.saveCallback.bind(this);
		this.selectedFileCallback = this.selectedFileCallback.bind(this);
	}

	// called when save button is presssed
	saveCallback() {
		const currentEditor = this.editorRef.current;
		const file_content_id = this.state.selectedFileContentID;
		if (currentEditor && file_content_id) {
			const content = currentEditor.state.content;
			CloudFileAPI.getInstance().uploadContents(content, file_content_id);
		}
	}

	// called when a file is selected
	selectedFileCallback(newSelectedFileID : string) {
		// get content id from selectedFileID
		const file_content_id = FileStructureAPI.getInstance().getFileContentID(newSelectedFileID);

		if (!file_content_id) { return; }

		// update current file id so safe save can occur

		this.setState({
			selectedFileContentID : file_content_id
		})

		// update content on editor
		var content_promise = CloudFileAPI.getInstance().readContents(file_content_id);
		content_promise.then((content : string) => {
			if (!content) {
				content = DEFAULT_FILE_CONTENT
			}

			const currentEditor = this.editorRef.current;
			if (currentEditor) {
				currentEditor.setState({
					content : content
				})
			}
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
								    <ul className="navbar-nav me-auto"></ul>
								    <span className="navbar-item">
								    	<RunBtn />
								    </span>
								    <span className="navbar-item">
								    	<SaveBtn saveCallback={this.saveCallback} />
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