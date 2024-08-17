const postsContainer = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPost = ({id, url, description, likes, comments}, container) => {
  const post = postTemplate.cloneNode(true);

  post.dataset.id = id;
  post.querySelector('.picture__img').src = url;
  post.querySelector('.picture__img').alt = description;
  post.querySelector('.picture__info .picture__comments').textContent = comments.length;
  post.querySelector('.picture__info .picture__likes').textContent = likes;

  container.append(post);
};

const renderPosts = (generatedPosts) => {
  const container = document.createDocumentFragment();

  if (!generatedPosts) {
    return;
  }

  generatedPosts.forEach((post) => {
    renderPost(post, container);
  });

  postsContainer.append(container);
};

export {
  renderPosts,
  postsContainer
};
