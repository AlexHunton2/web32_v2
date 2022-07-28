import * as firebasedb from "firebase/database";
import { getAuth } from "firebase/auth";

/*
Firebase Structure

file_contents:
	-file_id
		-owner: string (user_id)
		-content: string (10 MB UTF size limit)
*/

class CloudFileAPI {
	private db : firebasedb.Database;
	private userID : string;

	private static _instance: CloudFileAPI;

	private constructor() {
		this.db = firebasedb.getDatabase();
		this.userID = "";

		this.refreshID();
	}

	private refreshID() {
		const user = getAuth().currentUser;
		this.userID = "";
		if (user !== null) {
			this.userID = user.uid;
		}
	}	

	public static getInstance() {
		const i = this._instance || (this._instance = new this())
		this._instance.refreshID();
		return i;
	}
	
	/**
	 * Uploads file contents to file_content tree
	 * Returns a promise that resolves to the id to the affected file on success
	 * Return the error on failure
	 **/ 
	public uploadContents(content : string, file_id? : string) : Promise<string> {
		file_id = file_id ? file_id : '';
		const ref = firebasedb.ref(this.db, 'file_contents/' + file_id);
		return new Promise((resolve, reject) => {
			if (file_id) { // if not new
				firebasedb.set(ref, {
					owner : this.userID,
					content : content
				})
				.then(() => {
					resolve(file_id + "");
				})
				.catch((error) => {
					reject(error)
				})
			} else {  // if new
				var key : string | null = "";
				var pushThenableRef = firebasedb.push(ref, {
					owner : this.userID,
					content : content
				})
				key = pushThenableRef.key;
				pushThenableRef
				.then(() => {
					resolve(key + "");
				})
				.catch((error) => {
					reject(error)
				})
			}
		})
	}	

	/**
	 *  Returns the contents of the file from the firebase
	 **/
	public readContents(file_id : string) : Promise<string> {
		const ref = firebasedb.ref(this.db, 'file_contents/' + file_id);
		return new Promise((resolve, reject) => {
			firebasedb.onValue(ref, (snapshot : firebasedb.DataSnapshot) => {
				resolve(snapshot.val().content);
			})
		})
	}
}

export default CloudFileAPI;