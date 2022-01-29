import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { timeout } from 'utils';

type Props = {
  title?: string;
  isVisible: boolean;
  onClose: () => void;
};

const Modal: FC<Props> = ({ title, isVisible, children, onClose: handleClose }) => {
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
    <div className="fixed z-40 inset-0 h-full w-full">
      <div className="max-w-[450px] h-full mx-auto relative flex justify-center items-end overflow-hidden">
        <div className="opacity-30 absolute inset-0 bg-[#656565]" onClick={handleClose}></div>

        <div className=" w-full mx-auto">
          <div
            ref={contentRef}
            className="animate-[fadeInUp_0.25s_ease] border-0 rounded-t-lg shadow-lg relative flex flex-col w-full bg-white"
          >
            <div className=" flex items-center justify-center border-b border-blueGray-200">
              {title && (
                <>
                  <h3 className="text-2xl font-semibold p-2">{title}</h3>
                  <div
                    className="absolute right-2 top-0 w-[40px] h-[50px] flex items-center justify-center cursor-pointer text-red-400 select-none"
                    onClick={handleClose}
                  >
                    X
                  </div>
                </>
              )}
            </div>

            <div className="w-full h-full py-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
