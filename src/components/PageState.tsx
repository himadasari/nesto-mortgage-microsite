import type { PageStateProps } from '../types';

const PageState = ({ type = 'default', message }: PageStateProps) => {
  return (
    <div
      className={`page-state ${type === 'error' ? 'page-state--error' : ''}`}
    >
      {message}
    </div>
  );
};

export default PageState;
