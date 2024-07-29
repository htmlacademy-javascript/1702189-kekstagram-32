import {getPosts} from './data.js';
import {renderPosts} from './render.js';
import {openPost} from './post-view.js';

const POSTS_COUNT = 25;

const generatedPosts = getPosts(POSTS_COUNT);

renderPosts(generatedPosts);
openPost(generatedPosts);
