import { useState, useEffect, useCallback, useRef } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkedFilterList, checkedListLen } from "@/utils/atom";
import useOutSideClick from "@/hooks/useOutSideClick";

import styled from "styled-components";
import {
  FILTER_DATA,
  HEADER_HEIGHT_MO,
  Z_INDEX_FILTER,
} from "@/utils/constants";

const DEFAULT_FILTER_STATE = [[], [], [], []];

const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);

  // component inner state
  const [innerCheckedList, setInnerCheckedList] =
    useState(DEFAULT_FILTER_STATE);

  const filterRef = useRef(null);

  // recoil state
  const [checkedList, setCheckedList] = useRecoilState(checkedFilterList);
  const totalLen = useRecoilValue(checkedListLen);
  const [selected, setSelected] = useState(false);

  const toggleFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  useOutSideClick(filterRef, () => setOpenFilter(false));

  const handleSelected = () => {
    if (getFilterLen() === 0) {
      setSelected(false);
    } else {
      setSelected(true);
    }
    setOpenFilter(false);
    setCheckedList(innerCheckedList);
  };

  const handleCheckedKeyword = useCallback(
    (checked: boolean, item: string, idx: string) => {
      let numIdx = Number.parseInt(idx);
      if (checked) {
        let newList: any = [...innerCheckedList];
        newList[numIdx] = [...newList[numIdx], item];
        setInnerCheckedList(newList);
      } else if (!checked) {
        let newList: any = [...innerCheckedList];
        newList[numIdx] = newList[numIdx].filter((el: any) => el !== item);
        setInnerCheckedList(newList);
      }
    },
    [innerCheckedList]
  );

  const getFilterBtnClass = () => {
    // CASE1) 필터 창이 열려있는 경우 주황색 버튼
    if (openFilter) {
      return "button-orange";
    }
    // CASE2) 필터가 선택된 경우 검정 버튼
    if (selected) {
      return "button-black";
    }
    // CASE3) 디폴트는 흰색 아웃라인 버튼
    return "button-white-outline";
  };

  const getIconFilterClass = () => {
    if (selected || openFilter) {
      return "icon-filter-white";
    }
    return "icon-filter-outline";
  };

  const handleReset = () => {
    // recoil state 초기화
    setSelected(false);
    setCheckedList(DEFAULT_FILTER_STATE);
    setInnerCheckedList(DEFAULT_FILTER_STATE);
  };

  const getFilterLengthText = () => {
    const totalLen = getFilterLen();
    if (totalLen === 0) {
      return `필터 적용하기`;
    } else {
      return `필터 적용하기 (${totalLen})`;
    }
  };

  const handleKeywordRemove = (item: string) => {
    const newList: any = checkedList.map((arr) =>
      arr.filter((el) => el !== item)
    );
    setCheckedList(newList);
    setInnerCheckedList(newList);
  };

  const getFilterLen = () => {
    const len = innerCheckedList.reduce((acc, val) => acc + val.length, 0);
    return len;
  };

  useEffect(() => {
    if (totalLen) {
      setSelected(true);
      return;
    }
    const len = getFilterLen();
    if (len === 0) setSelected(false);
  }, [innerCheckedList]);

  return (
    <FilterWrapper ref={filterRef}>
      <div className="button-wrapper">
        <Button
          text="필터"
          icon={`icon-filter ${getIconFilterClass()}`}
          className={`button-br-10 ${getFilterBtnClass()} text-subtitle-1`}
          onClick={toggleFilter}
        />
        {totalLen > 0 && (
          <>
            <Button
              text="초기화"
              icon="icon-reset"
              className="button-br-10 button-white-outline text-subtitle-1 reset"
              onClick={handleReset}
            />
            {checkedList.map((list) =>
              list.map((item, key) => (
                <Button
                  key={key}
                  text={item}
                  className="button-br-10 button-grey text-subtitle-1"
                  data-item={item}
                  onClick={() => handleKeywordRemove(item)}
                >
                  <span className="icon-delete" />
                </Button>
              ))
            )}
          </>
        )}
      </div>

      {openFilter && (
        <FilterContent>
          <div className="filter__wrap">
            {FILTER_DATA.map((filter) => (
              <div
                key={filter.idx}
                className="filter-content"
              >
                <div className="text-subtitle-1">{filter.filter}</div>
                <div
                  className={`${
                    filter.idx === 0 ? "filter-keyword-grid" : "filter-keyword"
                  }`}
                >
                  {filter.data.map((data) => (
                    <div
                      key={data.idx}
                      className="filter-keyword-row"
                    >
                      <Input
                        type="checkbox"
                        id={data.name}
                        name={filter.idx.toString()}
                        onChange={(e) => {
                          handleCheckedKeyword(
                            e.target.checked,
                            e.target.id,
                            e.target.name
                          );
                        }}
                      />
                      <label
                        className="filter-keyword-row-text text-normal-300"
                        htmlFor={data.name}
                        // name={}
                      >
                        {data.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button
            text={getFilterLengthText()}
            className="button-orange long component-small"
            onClick={handleSelected}
            width="37.6rem"
          />
        </FilterContent>
      )}
    </FilterWrapper>
  );
};

export default Filter;

const FilterWrapper = styled.div`
  position: relative;
  display: inline-flex;

  .button-wrapper {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 1.6rem;

    position: sticky;
    top: ${HEADER_HEIGHT_MO};
    //height: 16.4rem;
  }
`;

const FilterContent = styled.div`
  position: absolute;
  top: 5.4rem;

  border-radius: 2rem;
  border: 0.25px solid ${(props) => props.theme.colors.black30};
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 40px 0px rgba(158, 158, 158, 0.12);
  z-index: ${Z_INDEX_FILTER};

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5.6rem 4.8rem;

  .button-orange {
    margin-top: 8.8rem;
  }

  .filter__wrap {
    display: flex;

    .filter-content {
      display: flex;
      flex-direction: column;

      & + .filter-content {
        margin-left: 5.6rem;
      }

      &:nth-last-child(1) {
        margin-right: 4.2rem;
      }

      .text-subtitle-1 {
        margin-bottom: 2.4rem;
      }

      .filter-keyword {
        display: flex;
        flex-direction: column;

        gap: 1rem;
        width: 14.8rem;
        flex-wrap: wrap;

        &-grid {
          display: grid;
          grid-template-rows: repeat(6, 2.4rem);
          grid-row-gap: 1rem;

          grid-auto-flow: column;
          align-self: center;
        }
        &-row {
          display: flex;
          align-items: center;
          width: 14.8rem;

          &-text {
            font-size: 1.6rem;
            margin-left: 1rem;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
