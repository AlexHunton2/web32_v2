import React from "react";
import FileStructureAPI from "./../../../utils/FileStructureAPI"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface NewFolderBtnState {}

interface NewFolderBtnProps {
	selectedItem : {[index : string] : any}
}

class NewFolderBtn extends React.Component<NewFolderBtnProps, NewFolderBtnState> {
	constructor(props : NewFolderBtnProps) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	validationSchema() {
		return Yup.object().shape({
		   folder_name: Yup.string()
		    	.min(2, 'Too Short!')
		    	.max(15, 'Too Long!')
		    	.required('Required'),
	    });
	}

	handleSubmit(formValue: { folder_name: string; }) {
		const { folder_name } = formValue;
		const key : string = String(this.props.selectedItem['key']);
		const fn = (folder_name == "") ? "null" : folder_name;
		FileStructureAPI.getInstance().createNewFolder(fn, key);
		($('#newFolderModal') as any).modal('hide')
	}

    render(): React.ReactNode {
    	const initialValues = {
    		folder_name: ""
    	}
        return (
            <div id="NewFolderBtn">
            	<button className="btn btn-success" id="newFolder" data-toggle="modal" style={{background: "#19aa8d"}} data-target="#newFolderModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder-plus" viewBox="0 0 16 16">
					  <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
					  <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
					</svg>
                </button>

                <div className="modal fade bd-example-modal-sm" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="newFolderModal">
				  <div className="modal-dialog modal-sm">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLabel">New Folder</h5>
				      </div>
				      <Formik 
				      	initialValues={initialValues} 
				      	onSubmit={this.handleSubmit}
				      	validationSchema={this.validationSchema}
				      >
				      <Form>
				      <div className="modal-body">
				          <div className="form-group">
				            <label className="col-form-label">Folder Name:</label>
				            <Field name="folder_name" type="form-control" className="form-control" id="recipient-name" />
				            <ErrorMessage
						            name="folder_name"
						            component="div"
						            className="alert alert-danger d-flex"
						     />
				          </div>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="submit" className="btn btn-primary">Create</button>
				      </div>
				      </Form>
				      </Formik>
				    </div>
				  </div>
				</div>
			</div>
        )
    }
};

export default NewFolderBtn;