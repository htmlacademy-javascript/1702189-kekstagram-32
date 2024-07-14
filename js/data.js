import {getRandomInteger, getRandomArrayElement} from './util.js';

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

const getComments = (max) => {
  const comments = [];

  for (let i = 0; i < max; i++) {
    const currentComment = {
      id: i + 1,
      avatar: `img/avatar-${getRandomInteger(AvatarNumber.MIN, AvatarNumber.MAX)}.svg`,
      message: COMMENT_MESSAGES[getRandomArrayElement(COMMENT_MESSAGES)],
      name: AUTHOR_NAMES[getRandomArrayElement(AUTHOR_NAMES)],
    };

    comments.push(currentComment);
  }

  return comments;
};

const getPosts = (max) => {
  const posts = [];

  for (let i = 1; i <= max; i++) {
    const currentPost = {
      id: i,
      url: `photos/${i}.jpg`,
      description: PHOTO_DESCRIPTIONS[getRandomArrayElement(PHOTO_DESCRIPTIONS)],
      likes: getRandomInteger(LikesNumber.MIN, LikesNumber.MAX),
      comments: getComments(getRandomInteger(CommentsNumber.MIN, CommentsNumber.MAX)),
    };

    posts.push(currentPost);
  }

  return posts;
};

export {getPosts};
