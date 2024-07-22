const renderPosts = (generatedPosts) => {
  const postsContainer = document.querySelector('.pictures');
  const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const container = document.createDocumentFragment();

  generatedPosts.forEach(({url, description, likes, comments}) => {
    const post = postTemplate.cloneNode(true);

    post.querySelector('.picture__img').src = url;
    post.querySelector('.picture__img').alt = description;
    post.querySelector('.picture__info .picture__comments').textContent = comments.length;
    post.querySelector('.picture__info .picture__likes').textContent = likes;

    container.append(post);
  });

  postsContainer.append(container);
};

export {renderPosts};
