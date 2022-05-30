import React from "react";
import ErrorBoundary from './ErrorBoundary';
import { DataSnapshot } from "firebase/database"
import { Tree } from 'antd';
import 'antd/dist/antd.css';
import './directory-tree-css.css'
import FileStructureAPI from "./../../utils/FileStructureAPI"

const { DirectoryTree } = Tree;

const test_treeData = [
	{
		title: 'parent 0',
		key: '0-0',
		children: [
			{
				title: 'leaf 0-0',
				key: '0-0-0',
				isLeaf: true,
			},
			{
				title: 'leaf 0-1',
				key: '0-0-1',
				isLeaf: true,
			},
			{
				title: 'parent 0.5',
				key: '0-0-2',
				children: [
					{
						title: 'left 0.5-fart',
						key: '0-0-3',
						children: [
							{
								title: 'asdasdasdasd',
								key: '0312312312',
								isLeaf: true
							}
						]
					}
				]
			}
		],
	},
	{
		title: 'parent 1',
		key: '0-1',
		children: [
			{
				title: 'leaf 1-0',
				key: '0-1-0',
				isLeaf: true,
			},
			{
				title: 'leaf 1-1',
				key: '0-1-1',
				isLeaf: true,
			},
		],
	},
];

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
}

interface FolderStructureProps {
	selectedItem : {[index : string] : any}
	setSelectedItem : (value : {[index : string] : any}) => void;
}

class FolderStructure extends React.Component<FolderStructureProps, FolderStructureState> {
		constructor(props: FolderStructureProps) {
			super(props);

			this.state = {
				treeData : []
			};

			this.onSelect = this.onSelect.bind(this)
		}

		componentDidMount() {
			const obs = FileStructureAPI.getInstance().fileSystemObservable;
			const _this = this;
			obs.subscribe({
				next(x) { 
					const c = treeifyFileSystem(x)
					_this.setState({
						treeData : c
					})
				}
			})
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