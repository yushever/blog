import classes from "./DeletePostModal.module.scss";
import GetPosts from "../../services/service";
import { ILoggedUser, IState } from "../../models";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface DeletePostModalProps {
  loggedInUser?: ILoggedUser;
  active: boolean;
  setActive: any;
  slug: string;
}

function DeletePostModal(props: DeletePostModalProps) {
  let getPosts = new GetPosts();

  let deleteArticle = (token: any, slug: any) => {
    getPosts.deletePost(token, slug);
  };
  return (
    <div className={props.active ? classes.modal : classes.hidden}>
      <div className={classes.container}>
        <img
          className={classes.icon}
          src="../../../public/images/alert.svg"></img>
        <div className={classes.delete}>
          Are you sure to delete this article?
        </div>
      </div>
      <div className={classes.buttons}>
        <button
          className={classes.cancel}
          onClick={() => props.setActive(false)}>
          No
        </button>
        <button
          className={classes.confirm}
          onClick={() => deleteArticle(props.loggedInUser?.token, props.slug)}>
          Yes
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(DeletePostModal);
