import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface LoginButtonState {
  error_message : string
}

interface LoginButtonProps {}

class LoginButton extends React.Component<LoginButtonProps, LoginButtonState> {
    constructor(props: LoginButtonProps) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        error_message: "",
      };
    }

    handleSubmit(formValue: { email: string; password: string }) {
      const { email, password } = formValue;

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
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
          password: ""
        }

        return (
            <div>
                <button className="btn btn-success dropdown-toggle my-2 my-sm-0" id="navbarDropdown" style={{background: "#19aa8d"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Login
                </button>
                <div style={{width:"15rem"}} className="dropdown-menu">
                {this.state.error_message &&
                (<div className="alert alert-danger" role="alert">
                  {this.state.error_message}
                </div>)}
                <div className="px-4 py-3">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit}
                  >
                    <Form>
                      <h4>Login</h4>
                      <div className="form-group">
                        <label>Email address</label>
                        <Field name="email" type="email" className="form-control" id="exampleDropdownFormEmail1"/>
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <Field name="password" type="password" className="form-control" id="exampleDropdownFormPassword1"/>
                      </div>
                      <button type="submit" className="btn btn-primary">Sign in</button>
                    </Form>
                  </Formik>
                </div>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/signup">Sign up</a>
                <a className="dropdown-item" href="#">Forgot password?</a>
              </div>
          </div>
        )
    }
}

export default LoginButton;