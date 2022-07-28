import React from "react";

interface ErrorHandlerState {
	errors : {id: number, title : string, message : string, type : string}[]
	id_counter : number
}

interface ErrorHandlerProps {}

const example_messages = [
	{	
		"id" : 0,
		"title" : "Oh no!",
		"message" : "There was an issue",
		"type" : "danger"
	},
	{
		"id" : 1,
		"title" : "Rats!",
		"message" : "AAAAAAAAAAA",
		"type" : "warning"
	}
]

class ErrorHandler extends React.Component<ErrorHandlerProps, ErrorHandlerState> {
	constructor(props : ErrorHandlerProps) {
		super(props);

		this.state = {
			errors : [],
			id_counter : 0
		}

		this.closeError = this.closeError.bind(this);
	}

	openError(title : string, message : string, type : string) {
		var errors = this.state.errors;
		var id_counter = this.state.id_counter;
		var new_error = { 
			"id" : id_counter,
			"title" : title,
			"message" : message,
			"type" : type,
		}
		errors.push(new_error)
		id_counter++;
		this.setState({
			errors : errors,
			id_counter : id_counter
		})
	}

	closeError(error : any, id : number) {
		var errors = this.state.errors;
		for (var i = errors.length - 1; i >= 0; --i) {
		    if (errors[i].id == id) {
		        errors.splice(i,1);
		    }
		}
		this.setState({
			errors : errors
		})
	}

    render(): React.ReactNode {
        return (
            <div id="ErrorHandler">
            	<div className="container">
				  <div className="row">
				  	{this.state.errors.map(error => {
				  		return (
				  			<div key={error.id} className={"alert alert-" + error.type + " alert-dismissible fade show"} role="alert">
							  <strong>{error.title}</strong> {error.message} &nbsp;
							  <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={event => this.closeError(event, error.id)}>
							    <span aria-hidden="true"> &times;</span>
							  </button>
							</div>
				  		)
				  	})}
				  </div>
				</div>
			</div>
        )
    }
};

export default ErrorHandler;