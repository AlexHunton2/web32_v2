
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/theme-github";

interface EditorState {
    content : string
    readOnly : boolean
}

interface EditorProps {}

const DEFAULT_FILE_CONTENT = "Open a file to view contents."

class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props);

        this.state = {
            content : DEFAULT_FILE_CONTENT,
            readOnly : true
        }

        this.onChange = this.onChange.bind(this)
    }

    updateContent(newContent : string) {
        this.setState({
            content : newContent
        })
    }

    onChange(value : string, event : any) {
        this.setState({
            content : value
        })
    }

    render(): React.ReactNode {
       return (
            <div>
                <AceEditor 
                        mode="lua"
						theme="github"
                        width="auto"
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
                        readOnly={this.state.readOnly}
                        onChange={this.onChange}
                        value={this.state.content}
			         	/>
			        </div>
        )
    }
};

export default Editor;