import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/theme-github";

interface EditorState {}

interface EditorProps {}

class Editor extends React.Component<EditorProps, EditorState> {
    render(): React.ReactNode {
        return (
            <div>
                <AceEditor mode="lua"
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
				/>
			</div>
        )
    }
};

export default Editor;