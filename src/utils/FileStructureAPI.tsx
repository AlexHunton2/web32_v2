import * as firebasedb from "firebase/database";
import { getAuth } from "firebase/auth";

/**
 * dbFile is the structure that will act as the bridge between the firebase api and
 * the necessary functions that deal with the data. 
 */
interface dbFile {
	parent : string // folder ID of parrent
	name : string // the name of the file
	contents : string // The entire file contents
}

/**
 * dbFolder is the structure that will act as the bridge between the firebase api and
 * the necessary functions that deal with the data. 
 */
interface dbFolder {
	parent : string // folder ID of parent
	name : string // the name of the folder
	folder_children : string[] // array of ids to folders
	file_children : string[] // array of ids to files
}

/**
 * Used by FolderStructure component to interface with the firebase database
 */
class FileStructureAPI {
	private db : firebasedb.Database;
	private userID: string;
	private static _instance: FileStructureAPI;

	private constructor() {
		const user = getAuth().currentUser;

		this.db = firebasedb.getDatabase();
		this.userID = "";
		if (user !== null) {
			this.userID = user.uid;
		}
	}

	public static getInstance() {
		return this._instance || (this._instance = new this());
	}

	/**
	 * What is used to do the necessary requests and construct a file structure that can be
	 * simulated through FolderStructure componnent.
	 */
	public retrieveEntireStructure() {}

	/**
	 * Generates a new folder in the database
	 */
	public createNewFolder(name: string, parent?: string) {
		const p = parent ? parent : "root";
		const folder_ref = firebasedb.ref(this.db, 'folders/');
		firebasedb.push(folder_ref, {
			userID: this.userID,
			parent: p,
			folder_children: [],
			file_children: []
		});

	}

	/**
	 * Generates a new file in the database
	 */
	public createNewFile(name: string, content: string, parent: string) {}

	private lookUpFolder(id: string) : dbFolder {
		let folder : dbFolder = { parent: "", name: "", folder_children: [], file_children: []};
		return folder;
	}

	private lookUpFile(id : string) : dbFile {
		let file : dbFile = { parent: "", name: "", contents: "" };
		return file;
	} 
}


const filesturctureAPI : FileStructureAPI = FileStructureAPI.getInstance();
export default filesturctureAPI;