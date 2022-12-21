import React, { useEffect, useState } from "react";
import classes from "./OpenedPost.module.scss";
import GetPosts from "../../services/service";
import DeletePostModal from "../DeletePost/DeletePostModal";
import { IState, ILoggedUser } from "../../models";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";

interface OpenedPostProps {
  loggedInUser?: ILoggedUser;
  // slug: string;
}

function OpenedPost(props: OpenedPostProps) {
  let getPosts = new GetPosts();
  const { slug } = useParams();
  const [post, setPost] = useState<any>({});
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    getPosts.getOnePost(slug as string).then((res) => {
      console.log("UseEffect:", res);
      setPost(res);
    });
  }, [slug]);

  console.log("Post", post);

  if (Object.keys(post).length === 0 || post === undefined) {
    console.log("IF", post);
    return null;
  }

  const publishDate = format(new Date(post.createdAt), "PPP");

  const mapTags = (tags: string[]) => {
    return tags.map((tag) => {
      return (
        <div className={classes.tag} key={tag}>
          {tag.slice(0, 100)}
        </div>
      );
    });
  };

  return (
    <div className={classes.container}>
      <DeletePostModal
        active={modalActive}
        setActive={setModalActive}
        slug={slug as string}
      />

      <div className={classes.header}>
        <div className={classes["header-info"]}>
          <div className={classes.heading}>
            <h2 className={classes.name}>{post.title}</h2>
            <button className={classes.likes}>{post.favoritesCount}</button>
          </div>
          <div className={classes.tags}>{mapTags(post.tagList)}</div>
        </div>
        <div className={classes["header-user"]}>
          <div className={classes["user-info"]}>
            <div className={classes.user}>{post.author.username}</div>
            <div className={classes.data}>{publishDate}</div>
          </div>
          <div className={classes["user-img"]}>
            <img
              className={classes.avatar}
              src={post.author.image}
              alt="avatar"></img>
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.text}>{post.description}</div>
        {props.loggedInUser &&
        props.loggedInUser.username === post.author.username ? (
          <div className={classes.buttons} onClick={() => setModalActive(true)}>
            <button className={classes.delete}>Delete</button>
            <button className={classes.edit}>
              <Link to={`/articles/${slug}/edit`}>Edit</Link>
            </button>
          </div>
        ) : null}
      </div>
      <div className={classes["main-text"]}>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(OpenedPost);
