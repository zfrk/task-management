import * as config from 'config';

export default () => {
  return config.get('root');
};
