import {getRandomArrayElement} from './util.js';
import {renderPosts} from './render.js';
import {debounce} from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const buttonsList = filtersContainer.querySelectorAll('.img-filters__button');
const defaultButton = filtersContainer.querySelector('#filter-default');
const randomButton = filtersContainer.querySelector('#filter-random');
const popularButton = filtersContainer.querySelector('#filter-discussed');

const RANDOM_POSTS_COUNT = 10;

let activeButton;
let filteredPosts;

const makeSorting = debounce((sortedPosts) => {
  document.querySelectorAll('.picture').forEach((item) => item.remove());
  renderPosts(sortedPosts);
});

const changeFilter = (posts) => {
  if (activeButton === defaultButton) {
    makeSorting(posts);
  }

  if (activeButton === randomButton) {
    filteredPosts = new Set();
    let randomIndex;

    while (filteredPosts.size < RANDOM_POSTS_COUNT) {
      randomIndex = getRandomArrayElement(posts);
      filteredPosts.add(posts[randomIndex]);
    }

    makeSorting(filteredPosts);
  }

  if (activeButton === popularButton) {
    const defaultPosts = posts.slice();

    filteredPosts = defaultPosts.sort((a, b) => b.likes - a.likes);

    makeSorting(filteredPosts);
  }
};

const showFilters = (posts) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersContainer.addEventListener('click', (evt) => {
    activeButton = evt.target;

    if (activeButton.closest('.img-filters__button')) {
      buttonsList.forEach((item) => item.classList.remove('img-filters__button--active'));
      activeButton.classList.add('img-filters__button--active');
    }

    changeFilter(posts);
  });
};

export {showFilters};
