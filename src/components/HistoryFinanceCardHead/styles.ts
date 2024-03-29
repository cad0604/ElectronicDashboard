import styled from 'styled-components';

interface ITagProps {
  color: string;
}

export const Container = styled.li`
  background-color: ${(props) => props.theme.colors.tertiary};

  list-style: none;
  border-radius: 8px;

  margin: 3px 0;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  transition: all 0.3s;

  position: relative;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding-left: 10px;
  }

  > div span {
    font-size: 22px;
    font-weight: 500;
  }
`;

export const Tag = styled.div<ITagProps>`
  width: 13px;
  height: 60%;

  background-color: ${(props) => props.color};

  position: absolute;
  left: 0;
`;

export const Small = styled.h3`
  margin-left: 10vw;
`

export const H5 = styled.h3`
  margin-right: 4vw
`

export const HX = styled.h3`
  margin-left: 7vw
`

export const HP5 = styled.h3`
  margin-right: 8vw
`

export const HPX = styled.h3`
  margin-left: 2vw
`