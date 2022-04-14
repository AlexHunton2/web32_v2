import React from "react";

interface AboutState {}

interface AboutProps {}

class About extends React.Component<AboutProps, AboutState> {
    render(): React.ReactNode {
        return (
            <div id="about">
            	<h1>About</h1>
			</div>
        )
    }
};

export default About;