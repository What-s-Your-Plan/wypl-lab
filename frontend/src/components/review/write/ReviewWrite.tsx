import useReviewStore from '@/stores/ReviewStore';
import {
  Content,
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
} from '@/objects/Content';

import RText from './RText';
import RPicture from './RPicture';
import REmotion from './REmotion';
import RWeather from './RWeather';
import RKpt from './RKpt';
import R4F from './R4F';
import Button from '@/components/common/Button';
import ArrowUp from '@/assets/icons/arrowUp.svg';
import ArrowDown from '@/assets/icons/arrowDown.svg';
import Trash from '@/assets/icons/trash.svg';

type ReviewWriteProps = {
  index: number;
  content: Content;
};

//type에 맞는 컴포넌트를 생성하기 위한 블록
function ReviewWrite({ index, content }: ReviewWriteProps) {
  const reviewStore = useReviewStore();

  const handleDropItem = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const dragItem = event.dataTransfer.getData('blockType');
    if (dragItem) {
      reviewStore.addContent(index, dragItem as ReviewType);
    } else {
      const itemIndex = event.dataTransfer.getData('nowIndex');
      if (itemIndex) {
        const dropY = event.clientY;

        const targetRect = (
          event.target as HTMLElement
        ).getBoundingClientRect();

        const dropDirection =
          dropY < targetRect.top + targetRect.height / 2 ? 0 : 1;

        const toIndex =
          index + dropDirection >= reviewStore.contents.length
            ? index
            : index + dropDirection;
        // Move the item in the reviewStore
        reviewStore.moveContent(Number(itemIndex), toIndex);
      }
    }
  };

  const handleMoveUp = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('Move Up');
    reviewStore.moveContent(index, index - 1);
    event.stopPropagation();
  };

  const handleMoveDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('Move Down');
    reviewStore.moveContent(index, index + 1);
    event.stopPropagation();
  };

  const handleDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('delete');
    reviewStore.deleteContent(index);
    event.stopPropagation();
  };

  const renderBlock = () => {
    switch (content.blockType) {
      case 'text':
        if (content instanceof TextContent) {
          return <RText index={index} content={content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'picture':
        if (content instanceof PictureContent) {
          return <RPicture index={index} content={content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'emotion':
        if (content instanceof EmotionContent) {
          return <REmotion index={index} content={content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'weather':
        if (content instanceof WeatherContent) {
          return <RWeather index={index} content={content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'kpt':
        if (content instanceof KPTContent) {
          return <RKpt index={index} content={content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case '4f':
        if (content instanceof FourFContent) {
          return <R4F index={index} content={content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      default:
        return null;
    }
  };

  return (
    <div
      draggable={true}
      onDragStart={(e: React.DragEvent) =>
        e.dataTransfer.setData('nowIndex', index.toString())
      }
      onDrop={handleDropItem}
      onClick={() => {
        reviewStore.setFocusIndex(index);
      }}
    >
      {reviewStore.focusIndex === index && (
        <span className="float-right isolate inline-flex gap-1 rounded-md shadow-sm bg-default-white p-1 mr-64 -mt-2">
          <Button $size="none" onClick={handleMoveUp}>
            <img src={ArrowUp} alt="위로 이동" className="w-5" />
          </Button>
          <Button $size="none" onClick={handleMoveDown}>
            <img src={ArrowDown} alt="아래로 이동" className="w-5" />
          </Button>
          <Button $size="none" onClick={handleDelete}>
            <img src={Trash} alt="삭제" className="w-5" />
          </Button>
        </span>
      )}
      {renderBlock()}
    </div>
  );
}

export default ReviewWrite;
