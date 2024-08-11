import {getData} from'./api.js';
import {renderPosts} from './render.js';
import {openPost} from './post-view.js';
import './form.js';

getData().then((posts) => {
  renderPosts(posts);
  openPost(posts);
});
