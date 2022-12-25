import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Popconfirm, Alert } from 'antd';
import { ToastContainer, toast } from 'react-toastify';

import * as actions from '../../actions';
import { IState, ILoggedUser } from '../../models';
import GetPosts from '../../services/service';

import classes from './OpenedPost.module.scss';
import 'react-toastify/dist/ReactToastify.css';

interface OpenedPostProps {
  loggedInUser?: ILoggedUser;
  getPosts: (token: string) => void;
}

function OpenedPost(props: OpenedPostProps) {
  let getPosts = new GetPosts();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>({});
  const [error, setError] = useState(false);

  useEffect(() => {
    getPosts
      .getOnePost(slug as string, props.loggedInUser?.token)
      .then((res) => {
        setError(false);
        setPost(res);
      })
      .catch(() => {
        setError(true);
      });
  }, [slug]);

  let deleteArticle = (token: string, postSlug: string) => {
    getPosts
      .deletePost(token, postSlug)
      .then(() => {
        toast.success('The post was deleted.');
        props.getPosts(props.loggedInUser?.token as string);
        navigate('/posts');
      })
      .catch(() => toast.error('Something went wrong. Please try again.'));
  };

  let likeArticle = (token: string, postSlug: string) => {
    getPosts.likePost(token, postSlug);
    let updatedPost = {
      ...post,
      favorited: true,
      favoritesCount: post.favoritesCount + 1,
    };
    setPost(updatedPost);
  };

  let dislikeArticle = (token: string, postSlug: string) => {
    getPosts.dislikePost(token, postSlug);
    let updatedPost = {
      ...post,
      favorited: false,
      favoritesCount: post.favoritesCount - 1,
    };
    setPost(updatedPost);
  };

  let errorAlert = error ? <Alert message="Something went wrong" type="error" /> : null;

  if (error) {
    return <div className={classes.alert}>{errorAlert}</div>;
  }

  if (Object.keys(post).length === 0 || post === undefined) {
    return null;
  }

  const publishDate = format(new Date(post.createdAt), 'PPP');

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
      <div className={classes.header}>
        <div className={classes['header-info']}>
          <div className={classes.heading}>
            <h2 className={classes.name}>{post.title}</h2>
            <button
              disabled={!props.loggedInUser ? true : false}
              className={`${post.favorited ? classes.liked : classes.likes}`}
              onClick={() => {
                if (post.favorited) {
                  dislikeArticle(props.loggedInUser?.token as string, slug as string);
                } else {
                  likeArticle(props.loggedInUser?.token as string, slug as string);
                }
              }}
            >
              {post.favoritesCount}
            </button>
          </div>
          <div className={classes.tags}>{mapTags(post.tagList)}</div>
        </div>
        <div className={classes['header-user']}>
          <div className={classes['user-info']}>
            <div className={classes.user}>{post.author.username}</div>
            <div className={classes.data}>{publishDate}</div>
          </div>
          <div className={classes['user-img']}>
            <img className={classes.avatar} src={post.author.image} alt="avatar"></img>
          </div>
        </div>
      </div>
      <div className={classes.wrapper}>
        <div className={classes.text}>{post.description}</div>
        {props.loggedInUser && props.loggedInUser.username === post.author.username ? (
          <div className={classes.buttons}>
            <Popconfirm
              title={<div className={classes.popup}>Are you sure to delete this article?</div>}
              onConfirm={() => deleteArticle(props.loggedInUser?.token as string, slug as string)}
              placement={'rightTop'}
              okText="Yes"
              cancelText="No"
            >
              <button className={classes.delete}>Delete</button>
            </Popconfirm>

            <button className={classes.edit}>
              <Link to={`/articles/${slug}/edit`}>Edit</Link>
            </button>
            <ToastContainer />
          </div>
        ) : null}
      </div>
      <div className={classes['main-text']}>
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
