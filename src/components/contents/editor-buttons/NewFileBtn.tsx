import React from "react";
import FileStructureAPI from "./../../../utils/FileStructureAPI"
import CloudFileAPI from "./../../../utils/CloudFileAPI"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface NewFileBtnState {}

interface NewFileBtnProps {
    selectedItem : {[index : string] : any}
}

const DEFAULT_FILE_CONTENT = "function start()\n\tlocal x = 5\nend";

class NewFileBtn extends React.Component<NewFileBtnProps, NewFileBtnState> {
    constructor(props : NewFileBtnProps) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
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
        const uploadPromise = CloudFileAPI.getInstance().uploadContents(DEFAULT_FILE_CONTENT);
        uploadPromise.then((contentID) => {
            const { folder_name } = formValue;
            const key : string = String(this.props.selectedItem['key'])
            const fn = (folder_name == "") ? "null" : folder_name;
            FileStructureAPI.getInstance().createNewFile(fn, key, contentID);
            ($('#newFileModal') as any).modal('hide');
        })
    }

    render(): React.ReactNode {
        const initialValues = {
            folder_name: ""
        }
        return (
            <div id="NewFileBtn">
            	<button className="btn btn-success" data-toggle="modal" id="newFile" style={{background: "#19aa8d"}} data-target="#newFileModal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-plus" viewBox="0 0 16 16">
					  <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
					  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
					</svg>
                </button>    
                <div className="modal fade bd-example-modal-sm" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="newFileModal">
                    <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">New File</h5>
                                </div>
                            <Formik 
                            initialValues={initialValues} 
                            onSubmit={this.handleSubmit}
                            validationSchema={this.validationSchema}
                            >
                            <Form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="col-form-label">File Name:</label>
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

export default NewFileBtn;