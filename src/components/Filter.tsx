import { useState, useEffect, useCallback, useRef } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkedFilterList, checkedListLen } from "@/utils/atom";
import useOutSideClick from "@/hooks/useOutSideClick";
import { flexColumnCenter } from "@/styles/theme";
import styled from "styled-components";
import {
  FILTER_DATA,
  HEADER_HEIGHT_MO,
  Z_INDEX_FILTER,
} from "@/utils/constants";

const DEFAULT_FILTER_STATE = [[], [], [], []];

const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const filterRef = useRef(null);

  // recoil state
  const [checkedList, setCheckedList] = useRecoilState(checkedFilterList);
  const totalLen = useRecoilValue(checkedListLen);
  const [selected, setSelected] = useState(false);

  // component inner state
  const [innerCheckedList, setInnerCheckedList] = useState(checkedList);

  const toggleFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  const handleOutSideclick = () => {
    setOpenFilter(false);

    // 창 닫을 때 키워드 눌렀던거 초기화
    setInnerCheckedList(checkedList); // 마지막 리코일에 저장된 상태로 초기화
  };
  useOutSideClick(filterRef, handleOutSideclick);

  const handleSelected = () => {
    getFilterLen() === 0 ? setSelected(false) : setSelected(true);
    setOpenFilter(false);
    setCheckedList(innerCheckedList);
  };

  const handleCheckedKeyword = useCallback(
    (checked: boolean, item: string, idx: string) => {
      let numIdx = Number.parseInt(idx);
      let newList: any = [...innerCheckedList];
      if (checked) {
        newList[numIdx] = [...newList[numIdx], item];
      } else if (!checked) {
        newList[numIdx] = newList[numIdx].filter((el: any) => el !== item);
      }
      setInnerCheckedList(newList);
    },
    [innerCheckedList]
  );

  const getFilterBtnClass = () =>
    openFilter
      ? "button-orange"
      : selected
      ? "button-black"
      : "button-white-outline";

  const getIconFilterClass = () =>
    selected || openFilter ? "icon-filter-white" : "icon-filter-outline";

  const getFilterLengthText = () => {
    console.log("getFilterLen", getFilterLen());
    return getFilterLen() === 0
      ? `필터 적용하기`
      : `필터 적용하기 (${getFilterLen()})`;
  };

  const handleKeywordRemove = (item: string) => {
    const newList: any = checkedList.map((arr) =>
      arr.filter((el) => el !== item)
    );
    setCheckedList(newList);
    setInnerCheckedList(newList);
  };

  const getFilterLen = () =>
    innerCheckedList.reduce((acc, val) => acc + val.length, 0);

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
              className="button-br-10 button-white-outline reset text-subtitle-1"
              onClick={() => {
                setSelected(false);
                setCheckedList(DEFAULT_FILTER_STATE);
                setInnerCheckedList(DEFAULT_FILTER_STATE);
              }}
            />
            {checkedList.map((list) =>
              list.map((item, key) => (
                <Button
                  key={`button-check-${key}`}
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
                key={`filter-${filter.idx}`}
                className="filter-content"
              >
                <h2
                  className="text-subtitle-1"
                  id="filter-label"
                >
                  {filter.filter}
                </h2>
                <ul
                  className={`${
                    filter.idx === 0 ? "filter-keyword-grid" : "filter-keyword"
                  }`}
                >
                  {filter.data.map((data) => (
                    <li
                      key={`filter-data-${data.idx}`}
                      className="filter-keyword-row"
                      aria-labelledby="filter-label"
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
                      >
                        {data.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Button
            text={getFilterLengthText()}
            width="37.6rem"
            className="component-small button-orange long"
            onClick={handleSelected}
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
  ${flexColumnCenter}
  position: absolute;
  top: 5.4rem;

  border-radius: 2rem;
  border: 0.25px solid ${(props) => props.theme.colors.black30};
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0px 0px 40px 0px rgba(158, 158, 158, 0.12);
  z-index: ${Z_INDEX_FILTER};
  padding: 5.6rem 4.8rem;

  .button-orange {
    margin-top: 8.8rem;
  }

  .filter__wrap {
    display: flex;

    .filter-content {
      & + .filter-content {
        margin-left: 5.6rem;
      }

      &:nth-last-child(1) {
        margin-right: 4.2rem;
      }

      h2 {
        margin-bottom: 2.4rem;
      }

      .filter-keyword {
        ${flexColumnCenter}
        width: 14.8rem;
        flex-wrap: wrap;
        gap: 1rem;

        &-grid {
          display: grid;
          grid-template-rows: repeat(6, 2.4rem);
          grid-row-gap: 1rem;
          grid-auto-flow: column;
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
