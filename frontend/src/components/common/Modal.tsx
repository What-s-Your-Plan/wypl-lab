import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import Button from '@/components/common/Button';

type Confirm = {
  content: string;
  handleConfirm: (() => void) | (() => Promise<void>);
};

type ModalProps = {
  isOpen: boolean;
  cancel?: string;
  confirm?: Confirm;
  title: React.ReactNode;
  contents: React.ReactNode;
  handleClose: (() => void) | (() => Promise<void>);
};

function Modal({
  isOpen,
  cancel = '닫기',
  confirm,
  title,
  contents,
  handleClose,
}: ModalProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            handleClose();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div">
                    {/* 타이틀 */}
                    {title}
                  </Dialog.Title>
                  <div className="mt-2 max-h-[70vh] overflow-auto">
                    {/* 컨텐츠 */}
                    {contents}
                  </div>
                  <div className="mt-4 flex justify-end gap-3">
                    <Button
                      $size="lg"
                      $width="60px"
                      $bgColor="white"
                      $textColor="black"
                      $border="black"
                      $hover={true}
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      {cancel}
                    </Button>
                    {confirm ? (
                      <Button
                        $size="lg"
                        $width="60px"
                        $bgColor="labelBrown"
                        $textColor="white"
                        $hover={true}
                        onClick={() => {
                          confirm.handleConfirm();
                          handleClose();
                        }}
                      >
                        {confirm.content}
                      </Button>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
