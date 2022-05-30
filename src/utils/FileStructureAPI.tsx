import * as firebasedb from "firebase/database";
import { getAuth } from "firebase/auth";
import { Observable } from 'rxjs';

/*
Firebase Structure

folders:
	-folder_key
		-name : string
		-parent : string
		-userID : string
files:
	-file_key
		-name : string
		-parent : string
		-contentID : string
		-userID : string
*/


/**
 * dbItem is the abstract representation of either folder or file
 */
interface dbItem {
	name : string // name / title of the item
	id : string // id of the item
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
	folder_children : dbFolder[] // array of folder children
	file_children : dbFile[] // array of file children
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

		this._fileSystemObservable = this.createFileSystemObservable();
		this.fileSystem = this._fileSystem;

		this.setupSubscription()
	}


	public static getInstance() {
		const i = this._instance || (this._instance = new this())
		this._instance.refreshID()
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
		const file_ref = firebasedb.ref(this.db, '/files');
		return new Observable<[]>(subscriber => {
			firebasedb.onValue(file_ref, (snapshot : firebasedb.DataSnapshot) => {
				subscriber.next(snapshot.val());
			});
		})
	}

	private createFolderObservable() : Observable<[]> {
		const folder_ref = firebasedb.ref(this.db, '/folders');
		return new Observable<[]>(subscriber => {
			firebasedb.onValue(folder_ref, (snapshot : firebasedb.DataSnapshot) => {
				subscriber.next(snapshot.val());
			});
		})
	}

	private setupSubscription() {
		const _this = this;
		this.folderObserver.subscribe({
			next(folders : { [index: string]: any; }) {
				// first pass, get all root folders
				// on all other passes, parent_folders gets updated
				// to folders in next level
				_this._fileSystem = [];
				var parent_folders = ['root'];
				var parent_arrays = [_this._fileSystem];
				while(Object.entries(folders).length !== 0) {
					var temp_folders : string[] = [];
					var temp_arrays : dbFolder[][] = [];
					Object.entries(folders).forEach(([key, value]) => {
						const c = value['parent']
						if (parent_folders.includes(value['parent'])) {
							const folder : dbFolder = {
								name: value['name'],
								id: key,
								folder_children: [],
								file_children: [],
							}
							temp_folders.push(key);
							temp_arrays.push(folder.folder_children);
							const i = parent_folders.indexOf(value['parent'])
							parent_arrays[i].push(folder);
							delete folders[key];
						}
					});
					parent_folders = temp_folders;
					parent_arrays = temp_arrays;
				}
				_this.fileSystem = _this._fileSystem;
			}
		})

		this.fileObserver.subscribe({
			next(files) {
				console.log(files);
			}
		})
	}

	private setFileSystemChangeCallback(callback : Function) {
		this.onFileSystemChangeCallback = callback;
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

	public get fileSystemObservable() {
		this.fileSystem = this._fileSystem;
		return this._fileSystemObservable;
	}

	/**
	 * Generates a new folder in the database
	 */
	public createNewFolder(name: string, parent: string) {
		console.log(parent)
		const p = (parent == null) ? parent : "root";
		const folder_ref = firebasedb.ref(this.db, 'folders/');
		firebasedb.push(folder_ref, {
			userID: this.userID,
			parent: p,
			name: name
		});

	}

	/**
	 * Generates a new file in the database
	 */
	public createNewFile(name: string, parent: string) {
		const c = 'idForLater';
		const p = (parent == null) ? parent : "root"; 
		const file_ref = firebasedb.ref(this.db, 'files/');
		firebasedb.push(file_ref, {
			userID: this.userID,
			parent: parent,
			name: name,
			contentID: c
		});
	}
}


export default FileStructureAPI;