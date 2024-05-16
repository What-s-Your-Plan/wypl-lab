import IndexButton from '@/components/common/IndexButton';
import { Dispatch, SetStateAction } from 'react';

type IndexGroupProps = {
  calendarType: CalenderType;
  setCType: Dispatch<SetStateAction<CalenderType>>;
};

function IndexGroup({ calendarType, setCType }: IndexGroupProps) {
  return (
    <div className="flex flex-col">
      <div className="invisible h-6" aria-hidden="true" />
      {/* <IndexButton
        $isActive={calendarType === 'YEAR'}
        onClick={() => {
          // setCType('YEAR');
          alert('준비 중');
        }}
      >
        Year
      </IndexButton> */}
      <IndexButton
        $isActive={calendarType === 'MONTH'}
        onClick={() => {
          setCType('MONTH');
        }}
      >
        Month
      </IndexButton>
      <IndexButton
        $isActive={calendarType === 'WEEK'}
        onClick={() => {
          setCType('WEEK');
        }}
      >
        Week
      </IndexButton>
      <IndexButton
        $isActive={calendarType === 'DAY'}
        onClick={() => {
          setCType('DAY');
        }}
      >
        Day
      </IndexButton>
    </div>
  );
}

export default IndexGroup;
