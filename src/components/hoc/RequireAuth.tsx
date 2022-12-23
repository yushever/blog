import { useLocation, Navigate } from "react-router-dom";
import { ILoggedUser, IState } from "../../models";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface RequireAuthProps {
  loggedInUser?: ILoggedUser;
  children: any;
}

const RequireAuth = (props: RequireAuthProps) => {
  const location = useLocation();

  if (!props.loggedInUser) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }
  return props.children;
};
const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(RequireAuth);
