import React from "react";

interface DocsState {}

interface DocsProps {}

class Docs extends React.Component<DocsProps, DocsState> {
    render(): React.ReactNode {
        return (
            <div id="Docs">
            	<h1>Docs</h1>
			</div>
        )
    }
};

export default Docs;