import { Pagination } from 'antd';
import { useState } from 'react';

export const PaginationCharacters = ({ postsPerPage, totalPosts, paginate }) => {
    const [current, setCurrent] = useState(1);

    const onChange = (page) => {
        paginate(page)
        setCurrent(page);
    };
  return (
      <Pagination size='default'  simple current={current} onChange={onChange} total={totalPosts} />
  )
}
