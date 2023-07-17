import styled from "styled-components";
import React from "react";

interface MasonryType {
  children: JSX.Element | React.ReactNode | React.ReactNode[];
  colCount: number;
}
const Masonry = ({ children, colCount }: MasonryType) => {
  const childrenArray: Array<
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
  > = React.Children.toArray(children);

  const childrenComponent = childrenArray.reduce(
    (
      acc: any,
      child,
      idx
    ): Array<
      | React.ReactElement<any | React.JSXElementConstructor<any>>
      | React.ReactFragment
      | React.ReactPortal
    > => {
      const column = idx % colCount;
      const currentArray = [...acc];
      if (currentArray[column] === undefined) {
        currentArray.push([child]);
      } else {
        currentArray[column].push(child);
      }
      return currentArray;
    }
  );

  /*
  const childColumns = childrenComponent.map((column: any, index: any) => {
    return <Column key={index}>{column}</Column>;
  });
  */
  /// 1. colCount COL
  // return <MasonryWrapper>{childColumns}</MasonryWrapper>;
};

export default Masonry;

const MasonryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
