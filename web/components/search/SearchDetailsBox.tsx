import { connectSearchBox } from 'react-instantsearch-dom';
import { Dropdown } from './Dropdown'

export const SearchDetailsBox = ({ 
  orderInitial, orderKeys, orderValues, orderChange, orderLabel,
  filterInitial, filterKeys, filterValues, filterChange, filterLabel
}) => (
    <div className="relative max-w-xl mx-auto">
      <div className="mx-auto flex flex-col md:flex-row justify-around">
        <div className="mx-2 my-2">
          <span className="mr-2">{orderLabel}</span>
          <Dropdown 
            onChange={orderChange}
            initial={orderInitial}
            keys={orderKeys} 
            values={orderValues}
          ></Dropdown>
        </div>

        <div className="mx-2 my-2">
          <span className="ml-4 mr-2">{filterLabel}</span>
          <Dropdown 
            onChange={filterChange}
            initial={filterInitial}
            keys={filterKeys} 
            values={filterValues}
          ></Dropdown>
        </div>
      </div>
    </div>
);


