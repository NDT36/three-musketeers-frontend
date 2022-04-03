import LinearWrapper from 'components/LinearWrapper';
import React, { FC } from 'react';

const SourceCardSkeleton: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-[250px]">
      <LinearWrapper className="h-[230px] w-full p-[1px] pt-0.5 rounded-3xl">
        <div className="w-full h-full bg-secondary rounded-3xl flex justify-center items-center">
          {/* Container */}
          <div className="w-full h-[190px] mx-3">
            <div className="max-w-sm w-full mx-auto h-full">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-14 w-14"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="grid grid-cols-4 gap-4">
                      <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                      <div className="h-4 bg-slate-200 rounded col-span-3"></div>
                    </div>
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                      <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LinearWrapper>
    </div>
  );
};

export default SourceCardSkeleton;
