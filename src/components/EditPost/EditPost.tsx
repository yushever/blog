import React, { useEffect, useState } from "react";
import classes from "./EditPost.module.scss";
import GetPosts from "../../services/service";
import { INewPost, IPost, ILoggedUser, IState, IEditPost } from "../../models";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface EditPostProps {
  loggedInUser?: ILoggedUser;
}

type EditPostForm = {
  title: string;
  description: string;
  text: string;
  tag1?: string;
  tag2?: string;
};

function EditPost(props: EditPostProps) {
  let getPosts = new GetPosts();
  const { slug } = useParams();
  // const [post, setPost] = useState<any>({});

  const [post, setPost] = useState({
    title: "",
    description: "",
    body: "",
  });

  useEffect(() => {
    getPosts.getOnePost(slug as string).then((res) => {
      console.log("UseEffect:", res);
      setPost(res);
      console.log("Post", post);
    });
  }, [slug]);

  console.log("Post", post);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EditPostForm>({
    // values: {
    //   title: post.title,
    //   description: "Title",
    //   text: post.description,
    // },
    defaultValues: {
      title: post.title,
      description: post.description,
      text: post.body,
    },
    mode: "onBlur",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    setPost((post) => ({ ...post, [name]: value }));
  }

  function handleForm(e: any) {
    let edittedPost: IEditPost = {
      title: post.title,
      description: post.description,
      body: post.body,
    };
    getPosts.editPost(
      { article: edittedPost },
      props.loggedInUser?.token as string,
      slug as string
    );
    console.log("You clicked submit");
    // reset();
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Edit article</div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className={classes.title}>
          <label>
            Title<br></br>
            <input
              {...register("title", {
                required: "Title is required",
              })}
              className={classes["input-title"]}
              type="text"
              placeholder="Title"
              value={post.title}
              onChange={handleChange}
            />
          </label>
          {/* <div style={{ height: 20 }}>
            {errors?.title && (
              <p className={classes["form-error"]}>
                {errors.title?.message || "Error!"}
              </p>
            )}
          </div> */}
        </div>
        <div className={classes.description}>
          <label>
            Short description<br></br>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              className={classes["input-description"]}
              type="text"
              placeholder="Description"
              value={post.description}
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {/* {errors?.description && (
              <p className={classes["form-error"]}>
                {errors.description?.message || "Error!"}
              </p>
            )} */}
          </div>
        </div>
        <div className={classes.text}>
          <label>
            Text<br></br>
            <textarea
              {...register("text", {
                required: "Text is required",
              })}
              className={classes["input-text"]}
              placeholder="Text"
              value={post.body}
              onChange={handleChange}
            />
          </label>
          {/* <div style={{ height: 20 }}>
            {errors?.text && (
              <p className={classes["form-error"]}>
                {errors.text?.message || "Error!"}
              </p>
            )}
          </div> */}
        </div>
        <div className={classes.tags}>
          <label>
            Tags<br></br>
            <input
              // {...register("tag1")}
              // className={classes["input-tag"]}
              type="text"
              placeholder="Tag"
              // onChange={handleChange}
            />
          </label>
          <button className={classes.delete}>Delete</button>
          <button className={classes.add}>Add tag</button>
        </div>
        <div className={classes.input}>
          <input
            // {...register("tag2")}
            className={classes["input-tag"]}
            type="text"
            placeholder="Tag"
            // onChange={handleChange}
          />
          <button className={classes.delete}>Delete</button>
          <button className={classes.add}>Add tag</button>
        </div>
        <button className={classes.submit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    loggedInUser: state.loggedInUser,
  };
};

export default connect(mapStateToProps, actions)(EditPost);
