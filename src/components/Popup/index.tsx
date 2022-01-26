import React, { FC, useCallback, useRef } from 'react';

type Props = {
  title?: string;
  isVisible: boolean;
  onClose: () => void;
};

const Popup: FC<Props> = ({ title, isVisible, children, onClose: parentHandleClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    contentRef.current?.classList.remove('animate-[scaleUp_0.25s_ease]');
    contentRef.current?.classList.remove('animate-[scaleDown_0.25s_ease]');
    contentRef.current?.classList.add('animate-[scaleDown_0.25s_ease]');

    setTimeout(() => parentHandleClose(), 200);
  }, [contentRef, parentHandleClose]);

  return isVisible ? (
    <div className="fixed z-50 inset-0 h-full w-full">
      <div className="max-w-[450px] h-full mx-auto flex justify-center items-center overflow-hidden px-10">
        <div className="opacity-30 absolute inset-0 bg-[#656565]" onClick={handleClose}></div>

        <div className="w-full">
          <div
            ref={contentRef}
            className="animate-[scaleUp_0.25s_ease] border-0 rounded-t-lg shadow-lg relative flex flex-col w-full bg-white"
          >
            <div className=" flex items-center justify-center border-b border-blueGray-200">
              <h3 className="text-2xl font-semibold p-2">{title}</h3>
            </div>

            <div className="w-full h-full py-2">{children}</div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Popup;
