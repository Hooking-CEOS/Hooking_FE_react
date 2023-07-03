import { useState } from "react";
import Button from "@/components/Button";
import styled from "styled-components";

const FILTER_DATA = [
  {
    idx: 0,
    filter: "무드 키워드",
    data: [
      { idx: "0", name: "퓨어한" },
      { idx: "1", name: "키치한" },
      { idx: "2", name: "자연의" },
      { idx: "3", name: "내추럴한" },
      { idx: "4", name: "독특한" },
      { idx: "5", name: "첨단의" },
      { idx: "6", name: "감각적인" },
      { idx: "7", name: "전통적인" },
      { idx: "8", name: "화려한" },
      { idx: "9", name: "고급스러운" },
      { idx: "10", name: "심플한" },
      { idx: "11", name: "발랄한" },
      { idx: "12", name: "비비드한" },
      { idx: "13", name: "도시적인" },
      { idx: "14", name: "수줍은" },
      { idx: "15", name: "친근한" },
    ],
  },
  {
    idx: 1,
    filter: "산업군",
    data: [
      { idx: "0", name: "스킨케어" },
      { idx: "1", name: "색조" },
      { idx: "2", name: "향수" },
      { idx: "3", name: "헤어바디" },
    ],
  },
  {
    idx: 2,
    filter: "타겟 나이대",
    data: [
      { idx: "0", name: "10-20대" },
      { idx: "1", name: "20-30대" },
      { idx: "2", name: "30-40대" },
      { idx: "3", name: "40대 이상" },
    ],
  },
  {
    idx: 3,
    filter: "가격대",
    data: [
      { idx: "0", name: "저가 라인" },
      { idx: "1", name: "중저가 라인" },
      { idx: "2", name: "프리미엄 라인" },
    ],
  },
];

const Filter = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const toggleFilter = () => {
    console.log("openFilter", openFilter);
    setOpenFilter((prev) => !prev);
  };

  return (
    <div>
      <Button
        text="필터"
        className="button-orange text-normal-600" //  button-orange
        onClick={toggleFilter}
      />

      {openFilter && (
        <FilterContent>
          <div className="filter__wrap">
            {FILTER_DATA.map((filter) => (
              <div key={filter.idx}>
                <h1>{filter.filter}</h1>
                <div>
                  {filter.data.map((data) => (
                    <div key={data.idx}>
                      <input
                        type="checkbox"
                        id={data.name}
                        name={data.name}
                        value={data.name}
                      />
                      <label htmlFor={data.name}>{data.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button text="필터 적용하기" />
        </FilterContent>
      )}
    </div>
  );
};

export default Filter;

const FilterContent = styled.div`
  position: absolute;
  max-width: 1194px;
  min-width: 800px;
  height: 364px;
  background-color: white;
  border: 1px solid black;
  z-index: 50;

  display: flex;
  flex-direction: column;

  .filter__wrap {
    display: flex;
  }
`;
