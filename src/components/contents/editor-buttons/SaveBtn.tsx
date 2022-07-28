import React from "react";

interface SaveBtnState {
	isSaving : boolean
}

interface SaveBtnProps {
	saveCallback : () => Promise<void>
}

class SaveBtn extends React.Component<SaveBtnProps, SaveBtnState> {
	constructor(props: SaveBtnProps) {
		super(props);

		this.state = {
			isSaving : false,
		};

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.setState({
			isSaving : true
		})
		const savePromise = this.props.saveCallback();
		savePromise.then(() => {
			this.setState({
				isSaving : false
			});
		})
	}

    render(): React.ReactNode {
        return (
            <div id="SaveBtn">
            	<button onClick={this.onClick} className="btn btn-success" id="newFolder" style={{background: "#19aa8d"}} disabled={this.state.isSaving}>
		        	{!this.state.isSaving && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
					  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
					</svg>}
					{this.state.isSaving && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
		        </button>
			</div>
        )
    }
};

export default SaveBtn;