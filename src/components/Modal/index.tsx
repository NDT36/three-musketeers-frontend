import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { timeout } from 'utils';

type Props = {
  title?: string;
  subTitle?: string;
  isVisible: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ title, subTitle, isVisible, children, onClose: handleClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(isVisible);

  const addAnimationClose = useCallback(() => {
    contentRef.current?.classList.remove('animate-[fadeInUp_0.25s_ease]');
    contentRef.current?.classList.remove('animate-[fadeOutDown_0.25s_ease]');
    contentRef.current?.classList.add('animate-[fadeOutDown_0.25s_ease]');
  }, [contentRef]);

  useEffect(() => {
    (async () => {
      if (visible !== isVisible) {
        if (isVisible) {
          setVisible(true);
        }

        if (!isVisible) {
          addAnimationClose();
          handleClose();

          await timeout(200);
          setVisible(false);
        }
      }
    })();
  }, [isVisible, addAnimationClose, visible, handleClose]);

  return visible ? (
    <div className="fixed z-40 inset-0 h-full w-full ">
      <div className="max-w-[450px] h-full mx-auto relative flex justify-center items-end overflow-hidden">
        <div className=" w-full h-full mx-auto">
          <div
            ref={contentRef}
            className="animate-[fadeInUp_0.25s_ease] rounded-t-lg shadow-lg relative flex flex-col w-full h-full border bg-primary  p-2 py-6 "
          >
            <SubPageWrapper title="Create source" onGoBack={handleClose}>
              {children}
            </SubPageWrapper>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
