const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment').cloneNode(true);
const commentsLoaderButton = document.querySelector('.comments-loader');
const commentsShownCount = document.querySelector('.social__comment-shown-count');

const MAX_COMMENTS_SHOWN_COUNT = 5;

let commentsShown = 0;

const getCommentsNumber = (post) => {
  if (post.comments.length > MAX_COMMENTS_SHOWN_COUNT) {
    commentsShown = MAX_COMMENTS_SHOWN_COUNT;
  } else {
    commentsShown = post.comments.length;
  }

  return commentsShown;
};

const showMoreComments = () => {
  const commentsList = Array.from(commentsContainer.children);

  for (let i = commentsShown; i < commentsShown + MAX_COMMENTS_SHOWN_COUNT; i++) {
    commentsList[i]?.classList.remove('hidden');
  }
  commentsShown += MAX_COMMENTS_SHOWN_COUNT;

  if (commentsShown >= commentsList.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsShownCount.textContent = commentsList.length;
  } else {
    commentsShownCount.textContent = commentsShown;
  }
};

commentsLoaderButton.addEventListener('click', showMoreComments);

const renderCommentsList = (post) => {
  const commentContainer = document.createDocumentFragment();

  post.comments.forEach((item, index) => {
    const comment = commentTemplate.cloneNode(true);
    const commentAuthor = comment.querySelector('.social__picture');
    commentAuthor.src = item.avatar;
    commentAuthor.alt = item.name;

    const commentCaption = comment.querySelector('.social__text');
    commentCaption.textContent = item.message;

    if (index >= MAX_COMMENTS_SHOWN_COUNT) {
      comment.classList.add('hidden');
    }

    commentContainer.append(comment);
  });

  const oldComments = Array.from(commentsContainer.children);
  oldComments.forEach((item) => item.remove());

  commentsContainer.append(commentContainer);

  if (commentsContainer.children.length <= MAX_COMMENTS_SHOWN_COUNT) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
};

export {renderCommentsList, getCommentsNumber};
