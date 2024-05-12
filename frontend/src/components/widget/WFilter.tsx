import { useEffect, useState } from 'react';

import useDateStore from '@/stores/DateStore';
import LabelButton from '../common/LabelButton';
import { LabelColorsType } from '@/assets/styles/colorThemes';
import getLabelList from '@/services/label/getLabelList';

function WFilter() {
  const dateStore = useDateStore();
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [allBgColor, setAllBgColor] = useState<string>('labelBrown');
  const [allClassName, setAllClassName] = useState<string>('h-8');

  const handleAllSelected = () => {
    if (!isAllSelected) dateStore.setAllSelected();
    else dateStore.clearSelectedLabels();

    setIsAllSelected(!isAllSelected);
  };

  const renderLabels = () => {
    return dateStore.labels.map((label: LabelResponse) => {
      const isSelected = dateStore.selectedLabels.includes(label.label_id);
      const labelBgColor =
        isSelected && !isAllSelected ? label.color : 'coolGray';
      const labelClassName =
        isSelected && !isAllSelected ? '' : '!text-default-black !font-medium';
      return (
        <LabelButton
          $bgColor={labelBgColor as LabelColorsType}
          className={labelClassName}
          key={label.label_id}
          onClick={() => {
            if (isAllSelected) {
              setIsAllSelected(false);
              dateStore.clearSelectedLabels();
            }
            if (isSelected && !isAllSelected) {
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
    dateStore.setAllSelected();
    setIsAllSelected(true);
  }, []);

  useEffect(() => {
    setAllBgColor(isAllSelected ? 'labelBrown' : 'coolGray');
    setAllClassName(
      isAllSelected ? 'font-semibold' : '!text-default-black !font-medium',
    );
  }, [isAllSelected]);

  return (
    <div>
      <div id="title">
        <div className="font-bold">필터링</div>
      </div>
      <div id="labelList" className="scrollBar flex flex-wrap gap-2 h-28 mt-2">
        <LabelButton
          $bgColor={allBgColor as LabelColorsType}
          className={allClassName}
          onClick={handleAllSelected}
        >
          전체
        </LabelButton>
        {renderLabels()}
      </div>
    </div>
  );
}

export default WFilter;
