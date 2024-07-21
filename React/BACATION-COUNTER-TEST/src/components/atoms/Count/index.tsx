import styled from '@emotion/styled';

import useCountStore from '../../../store/useStore';

const Container = styled.span`
  margin: 0 16px;
  font-size: 1.2rem;
`;

export const Count = () => {
  const count = useCountStore((state) => state.count);

  console.log(count);

  return <Container>{count}</Container>;
};
