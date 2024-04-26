import { Fragment, SetStateAction, Dispatch } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Props = {
  list: Array<any>;
  selected: string;    // state
  setSelected: Dispatch<SetStateAction<string>>;    // state setter
  width?: string;      //tailwind class로 넣어 주세요
}

function ListBox({width='w-72', list, selected, setSelected}: Props) {
  return (
    <div className={width}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="flex justify-between relative w-full cursor-pointer rounded-lg bg-default-white py-2 px-3 text-left shadow-lg focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-default-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className=" truncate">{selected}</span>
            <span className="pointer-events-none flex items-center">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-default-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {list.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-main/30 text-label-brown' : 'text-gray-700'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-main">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default ListBox