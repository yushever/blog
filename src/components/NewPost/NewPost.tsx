import React, { useEffect, useState } from "react";
import classes from "./NewPost.module.scss";
import GetPosts from "../../services/service";
import { INewPost, IPost, ILoggedUser, IState } from "../../models";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { connect } from "react-redux";
import * as actions from "../../actions";

interface NewPostProps {
  loggedInUser?: ILoggedUser;
}

type NewPostForm = {
  title: string;
  description: string;
  text: string;
  tagList: { value: string }[];
};

function NewPost(props: NewPostProps) {
  let getPosts = new GetPosts();

  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    text: "",
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<NewPostForm>({
    mode: "onBlur",
    defaultValues: {
      tagList: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray<NewPostForm>({
    control,
    name: "tagList",
  });

  let tags = fields.map((tag, index) => {
    return (
      <li>
        <input
          key={tag.id}
          {...register(`tagList.${index}.value`)}
          className={classes["input-tag"]}
          type="text"
          placeholder="Tag"
          // onChange={handleChange}
        />
        <button className={classes.delete} onClick={() => remove(index)}>
          Delete
        </button>
      </li>
    );
  });

  console.log("fields", fields);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setPost((post) => ({ ...post, [name]: value }));
  }

  function handleForm(e: any) {
    // e.preventDefault;
    let newArr: string[] = fields
      .filter((el) => el.value.length > 0)
      .map((el) => el.value);

    let newPost: INewPost = {
      title: post.title,
      description: post.description,
      body: post.text,
      tagList: newArr,
    };
    getPosts
      .createPost({ article: newPost }, props.loggedInUser?.token as string)
      .then((res) => {
        if (res.status === 200) {
          navigate("/posts");
        }
      });
    console.log("You clicked submit", newPost, props.loggedInUser?.token);
    reset();
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Create new article</div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className={classes.title}>
          <label>
            Title<br></br>
            <input
              style={{
                border: errors.title?.message ? "1px solid #F5222D" : "",
              }}
              {...register("title", {
                required: "Title is required",
                maxLength: {
                  value: 5000,
                  message: "Title is too long",
                },
              })}
              className={classes["input-title"]}
              type="text"
              placeholder="Title"
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.title && (
              <p className={classes["form-error"]}>
                {errors.title?.message || "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={classes.description}>
          <label>
            Short description<br></br>
            <input
              style={{
                border: errors.description?.message ? "1px solid #F5222D" : "",
              }}
              {...register("description", {
                required: "Description is required",
              })}
              className={classes["input-description"]}
              type="text"
              placeholder="Description"
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.description && (
              <p className={classes["form-error"]}>
                {errors.description?.message || "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={classes.text}>
          <label>
            Text<br></br>
            <textarea
              style={{
                border: errors.text?.message ? "1px solid #F5222D" : "",
              }}
              {...register("text", {
                required: "Text is required",
              })}
              className={classes["input-text"]}
              placeholder="Text"
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.text && (
              <p className={classes["form-error"]}>
                {errors.text?.message || "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={classes.tags}>
          Tags<br></br>
          <ul>{tags}</ul>
          <button
            className={classes.add}
            onClick={(e) => {
              e.preventDefault();
              append({ value: "" });
            }}>
            Add tag
          </button>
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

export default connect(mapStateToProps, actions)(NewPost);
