import React from "react";
import ErrorBoundary from './ErrorBoundary';
import { Tree } from 'antd';
import 'antd/dist/antd.css';
import './directory-tree-css.css'
const { DirectoryTree } = Tree;

const treeData = [
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

interface FolderStructureState {}

interface FolderStructureProps {}

class FolderStructure extends React.Component<FolderStructureProps, FolderStructureState> {
    render(): React.ReactNode {
        return (
            <div id="folder-structure">
            	<ErrorBoundary>
	            	<DirectoryTree
				      treeData={treeData}
				      style={{overflow: "auto", overflowX: 'scroll'}}
				    />
				</ErrorBoundary>
			</div>
        )
    }
};

export default FolderStructure;