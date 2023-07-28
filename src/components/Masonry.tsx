import styled from "styled-components";
import React from "react";

interface MasonryType {
  children: JSX.Element | React.ReactNode | React.ReactNode[];
  colCount: number;
}

type ChildrenComponentType = (
  | string
  | number
  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  | React.ReactFragment
  | React.ReactPortal
)[];

const Masonry = ({ children, colCount }: MasonryType) => {
  const childrenArray = React.Children.toArray(children);

  const childrenComponent: any = childrenArray.reduce(
    (acc: any, child, idx) => {
      const column = idx % colCount;
      let currentArray: any[];

      if (idx === 0) currentArray = [];
      else currentArray = [...acc];
      if (currentArray[column] === undefined) currentArray.push([child]);
      else currentArray[column].push(child);

      return currentArray;
    },
    []
  );

  const childColumns = childrenComponent.map((column: any, index: any) => {
    if (childrenComponent.length > 1) {
      return <Column key={`masonry-column-${index}`}>{column}</Column>;
    } else {
      return (
        <React.Fragment key={`masonry-column-1-${index}`}>
          <Column>{column}</Column>
          <Column />
        </React.Fragment>
      );
    }
  });

  return <MasonryWrapper>{childColumns}</MasonryWrapper>;
};

export default Masonry;

const MasonryWrapper = styled.div`
  display: flex;
  //justify-content: space-between;
  gap: 3rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex: 1;
`;
