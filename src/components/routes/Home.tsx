import React from "react";
import Editor from "../contents/Editor";

interface HomeState {}

interface HomeProps {}

class Home extends React.Component<HomeProps, HomeState> {
    render(): React.ReactNode {
        return (
            <div id="home">
            	<div id="home-content">
	                <Editor />
	            </div>
			</div>
        )
    }
};

export default Home;