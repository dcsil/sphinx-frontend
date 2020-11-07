// TODO: NODE_SERVER's production url
// TODO: AI_URL's development url
const NODE_SERVER =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://sphinx-backend.herokuapp.com';
const AI_URL = 'https://sphinx-model.herokuapp.com';

export { NODE_SERVER, AI_URL };
