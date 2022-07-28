import React from "react";
import FileStructureAPI from "./../../../utils/FileStructureAPI"
import CloudFileAPI from "./../../../utils/CloudFileAPI"

interface DeleteItemBtnState {}

interface DeleteItemBtnProps {
	selectedItem : {[index : string] : any}
	setSelectedItem : (value : {[index : string] : any}) => void;
}

class DeleteItemBtn extends React.Component<DeleteItemBtnProps, DeleteItemBtnState> {
	constructor(props : DeleteItemBtnProps) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (this.props.selectedItem['key'] != undefined) {
			if (this.props.selectedItem['isLeaf']) {
				const file_content_id = FileStructureAPI.getInstance().getFileContentID(this.props.selectedItem['key']);
				CloudFileAPI.getInstance().deleteContents(file_content_id);
				this.props.setSelectedItem({'key' : null, 'isLeaf' : true});
			}
			FileStructureAPI.getInstance().deleteItem(
				this.props.selectedItem['key'], 
				this.props.selectedItem['isLeaf'],
				this.props.selectedItem['children']
			);
		}
	}


    render(): React.ReactNode {
        return (
            <div id="DeleteItemBtn">
            	<button className="btn btn-success"  id="deleteFile" data-toggle="modal" style={{background: "#19aa8d"}} data-target="#deleteItemModal">
	              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
					  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
					  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
					</svg>
	            </button>

	            <div className="modal fade bd-example-modal-sm" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="deleteItemModal">
				  <div className="modal-dialog modal-sm">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
				      </div>
				      <div className="modal-body">
				          <div className="form-group">
				            <label className="col-form-label">Are you sure you want to delete?</label>
				          </div>
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="submit" className="btn btn-danger" onClick={this.handleClick} data-dismiss="modal">Delete</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
        )
    }
};

export default DeleteItemBtn;