import { useEffect } from 'react';

import useDateStore from '@/stores/DateStore';
import LabelButton from '../common/LabelButton';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import getLabelList from '@/services/label/getLabelList';

function WFilter() {
  const dateStore = useDateStore();
  useEffect(() => {
    const fetchLabelList = async () => {
      const labelList = await getLabelList();
      dateStore.setLabels(labelList);
    };

    fetchLabelList();
  }, []);

  const renderLabels = () => {
    return dateStore.labels.map((label: LabelResponse) => {
      return (
        <LabelButton
          $bgColor={label.color as LabelColorsType}
          className="font-semibold"
        >
          {label.title}
        </LabelButton>
      );
    });
  };

  return (
    <div>
      <div id="title">
        <div className="font-bold">필터링</div>
      </div>
      <div id="labelList" className="scrollBar flex flex-wrap gap-2 h-28 mt-2">
        <LabelButton $bgColor="labelCharcoal" className="font-semibold">
          전체
        </LabelButton>
        {renderLabels()}
      </div>
    </div>
  );
}

export default WFilter;
