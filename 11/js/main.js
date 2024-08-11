import {getData} from'./api.js';
import {renderPosts} from './render.js';
import {openPost} from './post-view.js';
import './form.js';
import {showFilters} from './posts-filters.js';

getData().then((posts) => {
  renderPosts(posts);
  openPost(posts);
  showFilters(posts);
});
