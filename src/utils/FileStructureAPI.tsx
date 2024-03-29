import * as firebasedb from "firebase/database";
import { getAuth } from "firebase/auth";
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash';

/*
Firebase Structure

folders:
	-userID
		-folder_key
			-name : string
			-parent : string
files:
	-userID
		-file_key
			-name : string
			-parent : string
			-contentID : string
*/


/**
 * dbItem is the abstract representation of either folder or file
 */
interface dbItem {
	name : string // name / title of the item
	id : string // id of the item
	parent : string
}

/**
 * dbFile is the structure that will act as the bridge between the firebase api and
 * the necessary functions that deal with the data. 
 */
interface dbFile extends dbItem {
	contentID : string // The file id to the contents 
}

/**
 * dbFolder is the structure that will act as the bridge between the firebase api and
 * the necessary functions that deal with the data. 
 */
interface dbFolder extends dbItem {
	children : dbItem[] // array of folder children
}

/**
 * Used by FolderStructure component to interface with the firebase database
 */
class FileStructureAPI {
	private db : firebasedb.Database;
	private userID: string;

	private static _instance: FileStructureAPI;

	private fileObserver : Observable<[]>;
	private folderObserver : Observable<[]>;

	private _fileSystemObservable : Observable<dbItem[]>;

	private dbFolders : dbFolder[];
	private dbFiles : dbFile[];

	private _fileSystem : dbItem[];
	private onFileSystemChangeCallback : Function;


	private constructor() {
		this.db = firebasedb.getDatabase();
		this.userID = "";

		this.refreshID();

		// used later to keep fileSystem always updated.
		this.fileObserver = this.createFileObservable();
		this.folderObserver = this.createFolderObservable();

		this._fileSystem = [];
		this.onFileSystemChangeCallback = () => {};

		this.dbFolders = [];
		this.dbFiles = [];

		this._fileSystemObservable = this.createFileSystemObservable();
		this.fileSystem = this._fileSystem;

		this.setupSubscription()
	}


	public static getInstance() {
		const i = this._instance || (this._instance = new this())
		this._instance.refreshID();
		return i;
	}

	private refreshID() {
		const user = getAuth().currentUser;
		this.userID = "";
		if (user !== null) {
			this.userID = user.uid;
		}
	}

	private createFileObservable() : Observable<[]> {
		const file_ref = firebasedb.ref(this.db, 'files/' + this.userID);
		return new Observable<[]>(subscriber => {
			firebasedb.onValue(file_ref, (snapshot : firebasedb.DataSnapshot) => {
				subscriber.next(snapshot.val());
			});
		})
	}

	private createFolderObservable() : Observable<[]> {
		const folder_ref = firebasedb.ref(this.db, 'folders/' + this.userID);
		return new Observable<[]>(subscriber => {
			firebasedb.onValue(folder_ref, (snapshot : firebasedb.DataSnapshot) => {
				subscriber.next(snapshot.val());
			});
		})
	}


	private constructFileSystem() {
		this._fileSystem = [];
		// the files that need to be sorted into the fileSystem
		// will be empty when we are done
		let a : dbItem[] = cloneDeep(this.dbFiles);
		let b : dbItem[] = cloneDeep(this.dbFolders);
		let temp_items : {[index : number] : dbItem} = a.concat(b);

		let level_folders = ['root'];
		let level_arrays = [this._fileSystem];

		for (let timeOut = 0; Object.keys(temp_items).length != 0; timeOut++) {
			if (timeOut > 20) {
				throw new Error("Timed Out Attempting To Retrive Folders/Files")
				break; // if there are more than 20+ levels of folders...
					   // make the damn projet with C++
			}

			let _t : string[] = [];
			let _a : any[] = [];
			Object.entries(temp_items).forEach(([key, item]) => {
				if (level_folders.includes(item['parent'])) {
					let folder = item as dbFolder;
					if (folder['children'] != undefined) {
						_t.push(folder['id'])
						_a.push(folder['children'])
					}
					let index = level_folders.indexOf(item['parent']);
					level_arrays[index].push(item);
					delete temp_items[Number(key)]	
				}
			})
			level_folders = _t;
			level_arrays = _a;
		}
		this.fileSystem = this._fileSystem;
	}

	/**
	 * Update the dbFiles/dbFolders as changes happen 
	 * so that they can be combined 
	 * in file system thru constructFileSystem
	 */
	private setupSubscription() {
		const _this = this;
		this.folderObserver.subscribe({
			next(folders : { [index: string]: any }) {
				_this.dbFolders = []
				if (folders != null) {
					Object.entries(folders).forEach(([key, value]) => {
						const folder : dbFolder = {
							name : value['name'],
							id : key,
							parent : value['parent'],
							children: []
						}
						_this.dbFolders.push(folder);
					})
				}
				_this.constructFileSystem();
			}
		})

		this.fileObserver.subscribe({
			next(files : { [index: string] : any }) {
				_this.dbFiles = [];
				if (files != null) {
					Object.entries(files).forEach(([key, value]) => {
						const file : dbFile = {
							name : value['name'],
							id : key,
							parent : value['parent'],
							contentID : value['contentID']
						}
						_this.dbFiles.push(file);
					})
				}
				_this.constructFileSystem();
			}
		})
	}

	private setFileSystemChangeCallback(callback : Function) {
		this.onFileSystemChangeCallback = callback;
	}

	/** 
	 * The interface for the fileSystem represented on the firebase.
	 * Please use this for all "read" operations
	 */
	public get fileSystem() {
		return this._fileSystem;
	}

	private set fileSystem(value:dbItem[]) {
		this._fileSystem = value;
		this.onFileSystemChangeCallback();
	}

	private createFileSystemObservable() {
		return new Observable<dbItem[]>(subscriber => {
			this.setFileSystemChangeCallback(() => 
				subscriber.next(this._fileSystem)
			)
		});
	}

	public set fileSystemObservable(value : Observable<dbItem[]>) {
		this._fileSystemObservable = value;
	}

	/**
	 * Get live updates on changes the user makes when changes by subscribing 
	 * to this observable
	 */
	public get fileSystemObservable() {
		this.fileSystem = this._fileSystem;
		return this._fileSystemObservable;
	}

	private getFID(fileID : string, arr : dbItem[]) : string {
		var res = "";
		for (var item of arr) {
			if (item.id == fileID) {
				res += (item as dbFile).contentID;
			} else {
				if ((item as dbFolder).children) {
					res += this.getFID(fileID, (item as dbFolder).children);
				}
			}
		}
		return res;
	}

	/**
	 * Get ContentID from FileID
	 */
	public getFileContentID(fileID : string) : string {
		if (!fileID) { return ""; }
		return this.getFID(fileID, this.fileSystem);
	}

	/**
	 * Generates a new folder in the database
	 */
	public createNewFolder(name: string, parent: string) {
		const p = (parent == 'undefined') ? "root" : parent;
		const folder_ref = firebasedb.ref(this.db, 'folders/' + this.userID);
		firebasedb.push(folder_ref, {
			parent: p,
			name: name
		});

	}

	/**
	 * Generates a new file in the database
	 */
	public createNewFile(name: string, parent: string, contentID : string) {
		const p = (parent == 'undefined') ? "root" : parent; 
		const file_ref = firebasedb.ref(this.db, 'files/' + this.userID);
		firebasedb.push(file_ref, {
			parent: p,
			name: name,
			contentID: contentID
		});
	}

	public deleteItem(key : string, isFile : boolean, children?: {[index : string] : any}[]) {
		if (!isFile && children != null) {
			children.forEach((child) => {
				this.deleteItem(child['key'], child['isLeaf'], child['children'])
			})
		}
		let path : string = isFile ? 'files/' : 'folders/';
		const item_ref = firebasedb.ref(this.db, path + this.userID + '/' + key);
		firebasedb.remove(item_ref)
	}
}


export default FileStructureAPI;