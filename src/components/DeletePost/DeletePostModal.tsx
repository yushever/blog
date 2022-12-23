import classes from "./DeletePostModal.module.scss";
import GetPosts from "../../services/service";
import { ILoggedUser, IState } from "../../models";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { message, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface DeletePostModalProps {
  loggedInUser?: ILoggedUser;
  active: boolean;
  setActive: any;
  slug: string;
}

const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.error("Click on No");
};

function DeletePostModal(props: DeletePostModalProps) {
  let getPosts = new GetPosts();

  let deleteArticle = (token: any, slug: any) => {
    getPosts.deletePost(token, slug);
  };
  return (
    <div>
      <Popconfirm
        title="Are you sure to delete this article?"
        onConfirm={() => deleteArticle(props.loggedInUser?.token, props.slug)}
        onCancel={() => props.setActive(false)}
        // icon={<QuestionCircle style={{ color: "yellow" }} />}
        placement={"rightTop"}
        okText="Yes"
        cancelText="No">
        <a href="#">Delete</a>
      </Popconfirm>
    </div>
    // <div className={props.active ? classes.modal : classes.hidden}>
    //   <div className={classes.container}>
    //     <img
    //       className={classes.icon}
    //       src="../../../public/images/alert.svg"></img>
    //     <div className={classes.delete}>
    //       Are you sure to delete this article?
    //     </div>
    //   </div>
    //   <div className={classes.buttons}>
    //     <button
    //       className={classes.cancel}
    //       onClick={() => props.setActive(false)}>
    //       No
    //     </button>
    //     <button
    //       className={classes.confirm}
    //       onClick={() => deleteArticle(props.loggedInUser?.token, props.slug)}>
    //       Yes
    //     </button>
    //   </div>
    // </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(DeletePostModal);
