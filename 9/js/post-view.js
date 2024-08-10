import {postsContainer} from './render.js';
import {renderCommentsList, getCommentsNumber} from './post-comments.js';
import {isEscape} from './util';

let currentPost;

const modalPostContainer = document.querySelector('.big-picture');
const bigPicture = modalPostContainer.querySelector('.big-picture__img img');
const postCaption = modalPostContainer.querySelector('.social__caption');
const likesCount = modalPostContainer.querySelector('.likes-count');
const commentsCountContainer = modalPostContainer.querySelector('.social__comment-count');
const commentsTotalCount = commentsCountContainer.querySelector('.social__comment-total-count');
const commentsShownCount = commentsCountContainer.querySelector('.social__comment-shown-count');
const modalButtonClose = modalPostContainer.querySelector('.big-picture__cancel');

modalButtonClose.addEventListener('click', closeModal);

const closeModalKeydown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal() {
  modalPostContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeModalKeydown);
}

const openPostFill = (currentId, generatedPosts) => {
  const post = generatedPosts.find((item) => item.id === Number(currentId));

  bigPicture.src = post.url;
  bigPicture.alt = post.description;

  postCaption.textContent = post.description;

  likesCount.textContent = post.likes;

  commentsTotalCount.textContent = post.comments.length;
  commentsShownCount.textContent = getCommentsNumber(post);

  renderCommentsList(post);
};

const openPost = (generatedPosts) => {
  postsContainer.addEventListener('click', (evt) => {
    currentPost = evt.target;
    if (currentPost.closest('.picture')) {
      evt.preventDefault();

      modalPostContainer.classList.remove('hidden');

      document.body.classList.add('modal-open');

      const currentId = currentPost.parentElement.dataset.id;
      openPostFill(currentId, generatedPosts);

      document.addEventListener('keydown', closeModalKeydown);
    }
  });
};

export {openPost};
