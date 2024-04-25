import ViewBlockList from '@/components/review/view/ViewBlockList';
import WriteBlockList from '@/components/review/write/WriteBlockList';

function ReviewWritePage() {
  return (
    <>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <ViewBlockList />
        <WriteBlockList />
      </div>
    </>
  );
}

export default ReviewWritePage;
