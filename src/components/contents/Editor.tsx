
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/theme-github";

interface EditorState {
    content : string
}

interface EditorProps {}

const DEFAULT_FILE_CONTENT = "UNKOWN ISSUE: FAILED TO LOAD FILE CORRECTLY"

class Editor extends React.Component<EditorProps, EditorState> {
    constructor(props: EditorProps) {
        super(props);

        this.state = {
            content : DEFAULT_FILE_CONTENT
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
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showPrintMargin: false
                        }}
                        onChange={this.onChange}
                        value={this.state.content}
			         	/>
			        </div>
        )
    }
};

export default Editor;