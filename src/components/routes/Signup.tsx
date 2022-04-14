import React from "react";

interface SignupState {}

interface SignupProps {}

class Signup extends React.Component<SignupProps, SignupState> {
    render(): React.ReactNode {
        return (
            <div id="Signup">
            	<div className="signup-form">
				    <form action="">
						<h2>Sign Up</h2>
						<p>Please fill in this form to create an account!</p>
				        <div className="form-group">
							<div className="input-group">
								<input type="email" className="form-control" name="email" placeholder="Email Address" required={true} />
							</div>
				        </div>
						<div className="form-group">
							<div className="input-group">
								<input type="password" className="form-control" name="password" placeholder="Password" required={true} />
							</div>
				        </div>
						<div className="form-group">
							<div className="input-group">
								<input type="password" className="form-control" name="confirm_password" placeholder="Confirm Password" required={true} />
							</div>
				        </div>
				        <div className="form-group">
							<label className="form-check-label"><input type="checkbox" required={true} /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
						</div>
						<div className="form-group">
				            <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
				        </div>
				    </form>
				</div>
			</div>
        )
    }
};

export default Signup;