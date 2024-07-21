import {getPosts} from './data.js';
import {renderPosts} from './render.js';

const POSTS_COUNT = 25;

const generatedPosts = getPosts(POSTS_COUNT);

renderPosts(generatedPosts);
