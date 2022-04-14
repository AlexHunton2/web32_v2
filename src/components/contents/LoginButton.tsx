import React from "react";

interface LoginButtonState {}

interface LoginButtonProps {}

class LoginButton extends React.Component<LoginButtonProps, LoginButtonState> {
    render(): React.ReactNode {
        return (
            <div>
            <li className="nav-item dropdown">
                <button className="btn btn-success dropdown-toggle my-2 my-sm-0" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Login
                </button>
                <div style={{width:"15rem"}} className="dropdown-menu">
                <form className="px-4 py-3">
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                  </div>
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                    <label className="form-check-label">
                      Remember me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Sign up</a>
                <a className="dropdown-item" href="#">Forgot password?</a>
              </div>
             </li>
          </div>
        )
    }
}

export default LoginButton;