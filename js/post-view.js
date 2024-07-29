import {postsContainer} from './render.js';

const MAX_COMMENTS_SHOWN_COUNT = 5;

let currentPost;

const modalPostContainer = document.querySelector('.big-picture');
const bigPicture = modalPostContainer.querySelector('.big-picture__img img');
const postCaption = modalPostContainer.querySelector('.social__caption');
const likesCount = modalPostContainer.querySelector('.likes-count');
const commentsCountContainer = modalPostContainer.querySelector('.social__comment-count');
const commentsTotalCount = commentsCountContainer.querySelector('.social__comment-total-count');
const commentsShownCount = commentsCountContainer.querySelector('.social__comment-shown-count');
const commentsContainer = modalPostContainer.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment').cloneNode(true);
const commentsLoaderButton = modalPostContainer.querySelector('.comments-loader');
const modalButtonClose = modalPostContainer.querySelector('.big-picture__cancel');

const closeModalKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal() {
  modalPostContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modalButtonClose.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', closeModalKeydown);
}

const getCommentsNumber = (post) => {
  if (post.comments.length > MAX_COMMENTS_SHOWN_COUNT) {
    return MAX_COMMENTS_SHOWN_COUNT;
  } else {
    return post.comments.length;
  }
};

const renderCommentsList = (post) => {
  const commentContainer = document.createDocumentFragment();

  post.comments.forEach((item) => {
    const comment = commentTemplate.cloneNode(true);
    const commentAuthor = comment.querySelector('.social__picture');
    commentAuthor.src = item.avatar;
    commentAuthor.alt = item.name;

    const commentCaption = comment.querySelector('.social__text');
    commentCaption.textContent = item.message;

    commentContainer.append(comment);
  });

  const oldComments = Array.from(commentsContainer.children);
  oldComments.forEach((item) => item.remove());

  commentsContainer.append(commentContainer);
};

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

      commentsLoaderButton.classList.add('hidden');
      commentsCountContainer.classList.add('hidden');

      document.body.classList.add('modal-open');

      const currentId = currentPost.parentElement.dataset.id;
      openPostFill(currentId, generatedPosts);

      modalButtonClose.addEventListener('click', closeModal);
      document.addEventListener('keydown', closeModalKeydown);
    }
  });
};

export {openPost};
