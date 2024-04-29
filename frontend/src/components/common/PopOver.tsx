import { Popover } from '@headlessui/react';

type Props = {
  button: React.ReactNode;
  panel: React.ReactNode;
  panelPosition?: string;  // 패널 위치를 테일윈드 클래스를 넣어주세요
}

function PopOver({button, panel, panelPosition='left-1/2 -translate-x-1/2 transform'}: Props) {
  return (
    <Popover className="relative size-fit">
      <Popover.Button className='focus:outline-none flex justify-center content-center'>
        {button}
      </Popover.Button>

      <Popover.Panel className={`absolute z-10 max-w-sm px-4 sm:px-0 lg:max-w-3xl rounded-lg ${panelPosition}`}>
        {panel}
      </Popover.Panel>
    </Popover>
  );
}

export default PopOver;
