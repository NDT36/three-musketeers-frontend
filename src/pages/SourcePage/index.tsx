import SubPageWrapper from 'components/SubPageWrapper/SubPageWrapper';
import React, { FC } from 'react';
import iconCreateNew from 'assets/icons-v2/icon-create-new.svg';
import LinearWrapper from 'components/LinearWrapper';

interface IProps {}

const SourcePage: FC<IProps> = (props) => {
  return (
    <div className="px-2">
      <SubPageWrapper title="Sources">
        <div className="h-36 text-center flex items-center">
          <div className="w-full">
            <div className="text-lg text-[#F6F6F6]">Available balance</div>
            <div className="text-5xl h-20 font-bold font-[Arya] flex items-center justify-center">
              100,000,000
            </div>
          </div>
        </div>
        {/* Create new */}
        <div className="h-[85px] flex justify-center items-center">
          <div className="border border-white rounded-[10px] flex px-6 py-2">
            <div className="flex justify-center items-center">
              <img src={iconCreateNew} alt="icon" />
            </div>
            <div className="pl-2">Create new</div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full h-[250px]">
          <LinearWrapper className="h-[230px] w-full p-[1px] pt-0.5 rounded-3xl">
            <div className="w-full h-full bg-secondary rounded-3xl flex justify-center items-center">
              {/* Container */}
              <div className="w-full h-[190px] mx-3">
                <div className="h-[113px]">
                  <div className="h-[25px] relative">
                    <div className="text-center text-lg text-[#f6f6f6]">Available balance</div>
                  </div>
                  <div className="text-5xl text-center h-[5.5rem] flex justify-center items-center font-[Arya]">
                    100,000,000
                  </div>
                </div>
                <div className="h-0.5 bg-slate-500 hr-gradient"></div>
                <div className="h-[85px] flex items-center justify-center"></div>
              </div>
            </div>
          </LinearWrapper>
        </div>
      </SubPageWrapper>
    </div>
  );
};

export default SourcePage;
