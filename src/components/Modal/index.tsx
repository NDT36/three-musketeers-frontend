import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { timeout } from 'utils';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ isVisible, children, onClose: handleClose }) => {
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
          // handleClose();

          await timeout(200);
          setVisible(false);
        }
      }
    })();
  }, [isVisible, addAnimationClose, visible, handleClose]);

  return visible ? (
    <div className="fixed z-40 inset-0 h-full w-full">
      <div className="max-w-[450px] h-full mx-auto relative flex justify-center items-end overflow-hidden">
        <div
          className="opacity-30 absolute inset-0 bg-[#656565]"
          onClick={() => handleClose()}
        ></div>

        <div className=" w-full mx-auto">
          <div
            ref={contentRef}
            className="animate-[fadeInUp_0.25s_ease] relative flex flex-col w-full"
          >
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
