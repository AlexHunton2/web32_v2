import React from "react";
import ErrorBoundary from './ErrorBoundary';
import { DataSnapshot } from "firebase/database"
import { Tree } from 'antd';
import 'antd/dist/antd.css';
import './directory-tree-css.css'
import FileStructureAPI from "./../../utils/FileStructureAPI"
import { Subscription } from "rxjs"

const { DirectoryTree } = Tree;

const OBS = FileStructureAPI.getInstance().fileSystemObservable;

/**
 * Give key, get title through the power of recursion
 */
function traverseTree(tree : { [index: string] : any}[], key : string) : string {
	if (tree == null) {
		return '';
	}

	var child_arrays : { [index: string] : any}[][] = []
	for (var i = 0; i < tree.length; i++) {
		if (tree[i]['key'] === key) {
			return tree[i]['title']
		}
		if (tree[i]['children'] !== null) {
			child_arrays.push(tree[i]['children']);
		}
	}

	var temp = '';
	for (var i = 0; i < child_arrays.length; i++) {
		const c = traverseTree(child_arrays[i], key)
		temp = temp.concat('' ,c)
		if (temp.length > 0) {
			return temp;
		}
	}
	return '';
}

/**
 * Convers what is given by FileStructureAPI into what can be
 * understood by <DirectoryTree />
 */
function treeifyFileSystem(nodes : any[]) : any {
	var temp = [];
	for (var i = 0; i < nodes.length; i++) {
		const v = nodes[i];
		if (v['children'] != undefined) {
			const c = treeifyFileSystem(v['children'])
			temp.push({
				title: v['name'], 
				key: v['id'],
				children: c
			});
		} else {
			temp.push({
				title: v['name'], 
				key: v['id'],
				isLeaf: true
			});
		}
	}
	return temp
} 
 
interface FolderStructureState {
	treeData : []; 
	subscription : Subscription
}

interface FolderStructureProps {
	selectedItem : {[index : string] : any}
	setSelectedItem : (value : {[index : string] : any}) => void;
}

class FolderStructure extends React.Component<FolderStructureProps, FolderStructureState> {
		constructor(props: FolderStructureProps) {
			super(props);

			this.state = {
				treeData : [],
				subscription : OBS.subscribe()
			};

			this.onSelect = this.onSelect.bind(this)
		}

		componentDidMount() {
			// Get every time we rerender
			const fs = FileStructureAPI.getInstance().fileSystem;
			const c = treeifyFileSystem(fs)
			this.setState({
				treeData : c
			});	

			const _this = this;
			const sub = OBS.subscribe({
				next(x) {
					_this.setState({
						subscription : sub,
						treeData : treeifyFileSystem(x)
					})
				}
			})
		}

		componentWillUnmount() {
			this.state.subscription.unsubscribe();
		}

		onSelect(selectedKeys : any, info : any) {
			this.props.setSelectedItem(info['selectedNodes'][0]);
		}

		render(): React.ReactNode {
			return (
				<div id="folder-structure">
					<ErrorBoundary>
						<DirectoryTree
							treeData={this.state.treeData}
							style={{overflow: "auto", overflowX: 'scroll', minWidth: "200px", width: "max-content"}}
							onSelect={this.onSelect}
						/>
					</ErrorBoundary>
				</div>
			)
		}
};

export default FolderStructure;