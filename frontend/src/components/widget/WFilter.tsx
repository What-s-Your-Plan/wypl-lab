import { useEffect } from 'react';

import useDateStore from '@/stores/DateStore';
import LabelButton from '../common/LabelButton';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import getLabelList from '@/services/label/getLabelList';

function WFilter() {
  const dateStore = useDateStore();

  const renderLabels = () => {
    return dateStore.labels.map((label: LabelResponse) => {
      const isSelected = dateStore.selectedLabels.includes(label.label_id);
      const labelBgColor =
        isSelected ? label.color : 'coolGray';
      const labelClassName =
        isSelected ? '' : '!text-default-black !font-medium';
      return (
        <LabelButton
          $bgColor={labelBgColor as LabelColorsType}
          className={labelClassName}
          key={label.label_id}
          onClick={() => {
            if (isSelected) {
              dateStore.removeSelectedLabels(label.label_id);
              return;
            }
            dateStore.addSelectedLabels(label.label_id);
          }}
        >
          {label.title}
        </LabelButton>
      );
    });
  };

  useEffect(() => {
    const fetchLabelList = async () => {
      const labelList = await getLabelList();
      dateStore.setLabels(labelList);
    };

    fetchLabelList();
  }, []);

  return (
    <div>
      <div id="title">
        <div className="font-bold">필터링</div>
      </div>
      <div id="labelList" className="scrollBar flex flex-wrap gap-2 h-28 mt-2">
        <LabelButton
          $bgColor={dateStore.selectedLabels.length === 0 ? 'labelBrown' : 'coolGray'}
          className={`h-8 ${dateStore.selectedLabels.length === 0 ? '' : '!text-default-black !font-medium'}`}
          onClick={dateStore.clearSelectedLabels}
        >
          전체
        </LabelButton>
        {renderLabels()}
      </div>
    </div>
  );
}

export default WFilter;
