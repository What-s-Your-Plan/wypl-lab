import { Fragment, SetStateAction, Dispatch } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import ChevronDown from '@/assets/icons/chevronDown.svg';

type Props = {
  list: Array<JSX.Element>;
  selected: string; // state
  setSelected: Dispatch<SetStateAction<string>>; // state setter
  width?: string; //tailwind class로 넣어 주세요
  topList?: React.ReactNode; // 리스트 상단에 추가할 컴포넌트
  bottomList?: React.ReactNode; // 리스트 하단에 추가할 컴포넌트
};

function renderSpan(values: Array<string | number>): Array<JSX.Element> {
  return values.map((value, index) => {
    return <span key={index}>{value}</span>;
  });
}

function ListBox({
  width = 'w-72',
  list,
  selected,
  setSelected,
  topList,
  bottomList,
}: Props) {
  return (
    <div className={width}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="flex justify-between relative w-full cursor-pointer rounded-lg bg-default-white py-2 px-3 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-default-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="truncate">{selected}</span>
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-default-warmgray/30 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {topList ? (
                <li className="relative, cursor-pointer, select-none">
                  {topList}
                </li>
              ) : null}
              {list.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 text-gray-700 ${
                      active ? 'bg-main/20' : ''
                    }`
                  }
                  value={item}
                >
                  {item}
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
