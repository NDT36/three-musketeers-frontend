import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { timeout } from 'utils';

type Props = {
  title?: string;
  isVisible: boolean;
  onClose: () => void;
};

const Popup: FC<Props> = ({ title, isVisible, children, onClose: handleClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const addAnimationClose = useCallback(() => {
    contentRef.current?.classList.remove('animate-[scaleUp_0.25s_ease]');
    contentRef.current?.classList.remove('animate-[scaleDown_0.25s_ease]');
    contentRef.current?.classList.add('animate-[scaleDown_0.25s_ease]');
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
    <div className="fixed z-50 inset-0 h-full w-full">
      <div className="max-w-[450px] h-full mx-auto flex justify-center items-center overflow-hidden px-10">
        <div className="opacity-30 absolute inset-0 bg-[#656565]" onClick={handleClose}></div>

        <div className="w-full">
          <div
            ref={contentRef}
            className="animate-[scaleUp_0.25s_ease] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white"
          >
            {title && (
              <div className=" flex items-center justify-center border-b border-blueGray-200">
                <h3 className="text-center text-2xl font-semibold p-2 text-gray-600">{title}</h3>
              </div>
            )}

            <div className="w-full h-full py-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Popup;
