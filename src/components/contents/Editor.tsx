
import React from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-lua";
import "ace-builds/src-noconflict/theme-github";

interface EditorState {}

interface EditorProps {}

class Editor extends React.Component<EditorProps, EditorState> {
    onChange(value : string, event : any) {
      //console.log(value);
    }

    render(): React.ReactNode {
        var file_content = "function x()\n\tlocal x = 5\nend"

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
                           onChange={this.onChange}
                           value={file_content}
			         	/>
			        </div>
        )
    }
};

export default Editor;