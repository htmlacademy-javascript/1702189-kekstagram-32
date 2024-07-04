const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const AUTHOR_NAMES = [
  'Михаил',
  'Александр',
  'Максим',
  'Марк',
  'Артем',
  'София',
  'Анна',
  'Мария',
  'Ева',
  'Виктория'
];

const PHOTO_DESCRIPTIONS = [
  'Сегодня лучший день',
  'Скажи "да" новым приключениям',
  'Когда вы не можете найти солнечный свет, станьте им сами',
  'Смысл жизни состоит в том, чтобы умереть молодым ... как можно позже',
  'Отдыхайте так, чтобы вы забывали брать телефон в руки',
  'Пятница — мое второе любимое слово'
];

const POSTS_COUNT = 25;

const AvatarNumber = {
  MIN: 1,
  MAX: 6
};

const LikesNumber = {
  MIN: 15,
  MAX: 200
};

const CommentsNumber = {
  MIN: 0,
  MAX: 30
};

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getComments = (max) => {
  const comments = [];

  for (let i = 0; i < max; i++) {
    const currentComment = {};

    currentComment.id = i + 1;
    currentComment.avatar = `img/avatar-${getRandomInteger(AvatarNumber.MIN, AvatarNumber.MAX)}.svg`;
    currentComment.message = COMMENT_MESSAGES[getRandomInteger(0, (COMMENT_MESSAGES.length - 1))];
    currentComment.name = AUTHOR_NAMES[getRandomInteger(0, (AUTHOR_NAMES.length - 1))];

    comments.push(currentComment);
  }

  return comments;
};

const getPosts = (max) => {
  const posts = [];

  for (let i = 1; i <= max; i++) {
    const currentPost = {};

    currentPost.id = i;
    currentPost.url = `photos/${i}.jpg`;
    currentPost.description = PHOTO_DESCRIPTIONS[getRandomInteger(0, (PHOTO_DESCRIPTIONS.length - 1))];
    currentPost.likes = getRandomInteger(LikesNumber.MIN, LikesNumber.MAX);
    currentPost.comments = getComments(getRandomInteger(CommentsNumber.MIN, CommentsNumber.MAX));

    posts.push(currentPost);
  }

  return posts;
};

getPosts(POSTS_COUNT);
