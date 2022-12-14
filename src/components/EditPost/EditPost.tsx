import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../actions';
import { ILoggedUser, IState, IEditPost } from '../../models';
import GetPosts from '../../services/service';

import classes from './EditPost.module.scss';
import 'react-toastify/dist/ReactToastify.css';

interface EditPostProps {
  loggedInUser?: ILoggedUser;
  getPosts: (token: string) => void;
}

type EditPostForm = {
  title: string;
  description: string;
  body: string;
  tagList: { value: string }[];
};

function EditPost(props: EditPostProps) {
  let getPosts = new GetPosts();
  const { slug } = useParams();

  const [post, setPost] = useState({
    title: '',
    description: '',
    body: '',
    tagList: [],
  });

  let parsedTags = post.tagList.map((el) => ({ value: el }));

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EditPostForm>({
    defaultValues: {
      title: post.title,
      description: post.description,
      body: post.body,
      tagList: parsedTags,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    getPosts.getOnePost(slug as string).then((res) => {
      setValue('title', res.title);
      setValue('description', res.description);
      setValue('body', res.body);
      setPost(res);
    });
  }, [slug]);

  const { fields, append, remove, update } = useFieldArray<EditPostForm>({
    control,
    name: 'tagList',
  });

  let tags = fields.map((tag, index) => {
    return (
      <li key={'liKey:' + tag.id}>
        <input
          key={tag.id}
          {...register(`tagList.${index}.value`)}
          className={classes['input-tag']}
          type="text"
          placeholder="Tag"
        />
        <button className={classes.delete} onClick={() => remove(index)}>
          Delete
        </button>
      </li>
    );
  });

  useEffect(() => {
    for (let i = 0; i < post.tagList.length; i++) {
      update(i, { value: post.tagList[i] });
    }
  }, [post]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setPost(() => ({ ...post, [name]: value }));
  }

  function handleForm() {
    let newArr: string[] = fields.filter((el) => el.value.length > 0).map((el) => el.value);
    let edittedPost: IEditPost = {
      title: post.title,
      description: post.description,
      body: post.body,
      tagList: newArr,
    };
    getPosts
      .editPost({ article: edittedPost }, props.loggedInUser?.token as string, slug as string)
      .then(() => {
        toast.success('The post was edited.');
        props.getPosts(props.loggedInUser?.token as string);
      })
      .catch(() => toast.error('Something went wrong. Please try again.'));
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>Edit article</div>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className={classes.title}>
          <label>
            Title<br></br>
            <input
              style={{
                border: errors.title?.message ? '1px solid #F5222D' : '',
              }}
              {...register('title', {
                required: 'Title is required',
              })}
              className={classes['input-title']}
              type="text"
              placeholder="Title"
              value={post.title}
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.title && <p className={classes['form-error']}>{errors.title?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={classes.description}>
          <label>
            Short description<br></br>
            <input
              style={{
                border: errors.description?.message ? '1px solid #F5222D' : '',
              }}
              {...register('description', {
                required: 'Description is required',
              })}
              className={classes['input-description']}
              type="text"
              placeholder="Description"
              value={post.description}
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.description && <p className={classes['form-error']}>{errors.description?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={classes.text}>
          <label>
            Text<br></br>
            <textarea
              style={{
                border: errors.body?.message ? '1px solid #F5222D' : '',
              }}
              {...register('body', {
                required: 'Text is required',
              })}
              className={classes['input-text']}
              placeholder="Text"
              value={post.body}
              onChange={handleChange}
            />
          </label>
          <div style={{ height: 20 }}>
            {errors?.body && <p className={classes['form-error']}>{errors.body?.message || 'Error!'}</p>}
          </div>
        </div>
        <div className={classes.tags}>
          <div className={classes['tag-list']}>
            Tags
            <ul>{tags}</ul>
          </div>
          <div className={classes['add-tag']}>
            <button
              className={classes.add}
              onClick={(e) => {
                e.preventDefault();
                append({ value: '' });
              }}
            >
              Add tag
            </button>
          </div>
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
