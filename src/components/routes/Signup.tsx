import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface SignupState {
	error_message : string

}

interface SignupProps {
	history : string;
}

class Signup extends React.Component<SignupProps, SignupState> {
	constructor(props: SignupProps) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			error_message: "",
		};
	}

	validationSchema() {
		return Yup.object().shape({
		   email: Yup.string().email('Invalid email').required('Required'),
		   password: Yup.string()
		    	.min(6, 'Too Short!')
		    	.max(15, 'Too Long!')
		    	.required('Required'),
		   confirm_password: Yup.string()
		   	 	.required('Required')
		   	 	.oneOf([Yup.ref('password')], 'Your passwords don\'t match.'),
	    });
	}

	handleSubmit(formValue: { email: string; password: string }) {
		const { email, password } = formValue;

	    const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
		  .then((userCredential) => {
		    // Signed in 
		    window.location.reload();
		  })
		  .catch((error) => {
		    const errorMessage = error.message;
		    this.setState({
		    	error_message: errorMessage
		    })
		});
	}

    render(): React.ReactNode {
    	const initialValues = {
			email: "",
			password: "",
			confirm_password: ""
		}

        return (
            <div id="Signup">
            	{this.state.error_message &&
            	(<div className="alert alert-danger" role="alert">
				  {this.state.error_message}
				</div>)}
            	<div className="signup-form">
            		<Formik 
            			initialValues={initialValues}
            			validationSchema={this.validationSchema}
				        onSubmit={this.handleSubmit}
				    >
					    <Form>
							<h2>Sign Up</h2>
							<p>Please fill in this form to create an account!</p>
					        <div className="form-group">
								<div className="input-group">
									<Field type="email" className="form-control" name="email" placeholder="Email Address" required={true} />
								</div>
								<ErrorMessage
						            name="email"
						            component="div"
						            className="alert alert-danger d-flex"
						        />
					        </div>
							<div className="form-group">
								<div className="input-group">
									<Field type="password" className="form-control" name="password" placeholder="Password" required={true} />
								</div>
								<ErrorMessage
						            name="password"
						            component="div"
						            className="alert alert-danger d-flex"
						        />
					        </div>
							<div className="form-group">
								<div className="input-group">
									<Field type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" required={true} />
								</div>
								<ErrorMessage
						            name="confirm_password"
						            component="div"
						            className="alert alert-danger d-flex"
						        />
					        </div>
					        <div className="form-group">
								<label className="form-check-label"><input type="checkbox" required={true} /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
							</div>
							<div className="form-group">
					            <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
					        </div>
					    </Form>
					</Formik>
				</div>
			</div>
        )
    }
};

export default Signup;