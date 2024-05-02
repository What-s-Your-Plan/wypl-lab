import { Fragment, SetStateAction, Dispatch } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import ChevronDown from '@/assets/icons/chevronDown.svg';

type ListBoxProps = {
  list: Array<any>;
  render?: (value: any) => JSX.Element | Array<JSX.Element>;
  selected: any; // state
  setSelected: Dispatch<SetStateAction<any>>; // state setter
  width?: string; //tailwind class로 넣어 주세요
  height?: string;
  topList?: React.ReactNode; // 리스트 상단에 추가할 컴포넌트
  bottomList?: React.ReactNode; // 리스트 하단에 추가할 컴포넌트
};

function renderSpan(value: string | number): JSX.Element {
  return <span className="truncate">{value}</span>;
}

function ListBox({
  width = 'w-72',
  height = 'h-8',
  list,
  render = renderSpan,
  selected,
  setSelected,
  topList,
  bottomList,
}: ListBoxProps) {
  return (
    <div className={`${width}`}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className={`${height} flex items-center justify-between relative w-full cursor-pointer rounded-lg px-2 min-h-8 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-default-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm`}
          >
            {render(selected)}
            <span className="pointer-events-none flex items-center">
              <img src={ChevronDown} className="h-5 w-5" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="scrollBar absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-default-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {topList ? (
                <li className="relative cursor-pointer select-none">
                  {topList}
                </li>
              ) : null}
              {list.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none px-4 py-2 text-gray-700 ${
                      active ? 'bg-main/20' : ''
                    }`
                  }
                  value={item}
                >
                  {render(item)}
                </Listbox.Option>
              ))}
              {bottomList ? <li>{bottomList}</li> : null}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default ListBox;
export { renderSpan };
