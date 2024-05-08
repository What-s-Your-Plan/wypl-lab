import useDateStore from '@/stores/DateStore';
import LabelButton from '../common/LabelButton';
type Props = {};

function WFilter({}: Props) {
  const dateStore = useDateStore();
  
  const renderLabels() = () => {
    return dateStore.labels.map((label) => {
      return <LabelButton label={label} />;
    });
  }

  return (
    <div>
      <div id="title">
        <div>필터링</div>
      </div>
      <div id="labelList"></div>
    </div>
  );
}

export default WFilter;
