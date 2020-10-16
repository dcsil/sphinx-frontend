// TODO: NODE_SERVER's production url
// TODO: AI_URL's development url
const NODE_SERVER =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ? 'http://localhost:5000'
    : '';
const AI_URL = 'https://sphinx-model.herokuapp.com';

export { NODE_SERVER, AI_URL };
