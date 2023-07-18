import styled from "styled-components";
import React from "react";
/*
interface MasonryType {
  children: JSX.Element | React.ReactNode | React.ReactNode[];
  colCount: number;
}
*/

// React.ChildrenAPI

const Masonry = ({ children, colCount }) => {
  //console.log("[React.children]", React.Children);
  // map, forEach, count, toArray, only

  // 자식 여러개, 1개
  const childrenArray = React.Children.toArray(children);
  //console.log("[childrenArray]", childrenArray);

  const childrenComponent = childrenArray.reduce((acc, child, idx) => {
    //console.log("[acc]", acc, "[idx]", idx);
    const column = idx % colCount;
    let currentArray;

    //첫번째는 깊은복사 불가
    if (idx === 1) {
      currentArray = [];
    } else currentArray = [...acc];
    if (currentArray[column] === undefined) {
      currentArray.push([child]);
    } else {
      currentArray[column].push(child);
    }
    return currentArray;
  });

  //console.log("[childrenComponent]", childrenComponent);

  const childColumns = childrenComponent.map((column, index) => {
    return <Column key={index}>{column}</Column>;
  });

  /// 1. colCount COL
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
