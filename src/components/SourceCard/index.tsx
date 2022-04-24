import LinearWrapper from 'components/LinearWrapper';
import React, { FC, useState } from 'react';
import iconTransfer from 'assets/icons-v2/icon-transfer.svg';
import iconEditBalance from 'assets/icons-v2/icon-edit-balance.svg';
import iconEdit from 'assets/icons-v2/icon-edit.svg';
import iconDelete from 'assets/icons-v2/icon-delete.svg';
import { useNavigate } from 'react-router-dom';
import { IAssetSources } from 'pages/SourcePage';
import { RoutePath } from 'types/enum';
import Popup from 'components/Popup';
import { formatCurrency } from 'utils';

type Props = {
  source: IAssetSources;
  onDelete: () => void;
  isHideMenu?: boolean;
};

const SourceCard: FC<Props> = ({ source, onDelete, ...props }) => {
  const [askVisible, setAskVisible] = useState(false);
  const navigate = useNavigate();

  const onCloseAskVisible = () => {
    setAskVisible(false);
  };

  const onOpenAskVisible = () => {
    setAskVisible(true);
  };

  const onClickEditSource = () => {
    navigate(RoutePath.EDIT_SOURCE.replace(':id', source._id));
  };

  const onClickEditBalance = () => {
    navigate(RoutePath.EDIT_SOURCE_BALANCE.replace(':id', source._id));
  };

  const onClickTransferMoney = () => {
    navigate(RoutePath.TRANSFER_MONEY.replace(':id', source._id));
  };
  return (
    <div className="flex justify-center items-center w-full h-[250px]">
      <LinearWrapper className="h-[230px] w-full p-[1px] pt-0.5 rounded-3xl">
        <Popup
          title={`Do you want delete the ${source.name} source?`}
          isVisible={askVisible}
          onClose={onCloseAskVisible}
        >
          <div className="flex font-bold text-gray-600">
            <div
              onClick={onCloseAskVisible}
              className="w-1/2 h-10 rounded-sm flex items-center justify-center cursor-pointer hover:bg-green-600 hover:text-white"
            >
              No
            </div>
            <div
              onClick={() => {
                onCloseAskVisible();
                onDelete();
              }}
              className="w-1/2 h-10 rounded-sm flex items-center justify-center cursor-pointer hover:bg-red-500 hover:text-white"
            >
              Yes, delete!
            </div>
          </div>
        </Popup>

        <div className="w-full h-full bg-secondary rounded-3xl flex justify-center items-center">
          {/* Container */}
          <div className="w-full h-[190px] mx-3">
            <div className="h-[113px]">
              <div className="h-[25px] relative">
                <div className="text-left text-lg font-bold text-[#f6f6f6]">{source.name}</div>
              </div>
              <div className="text-5xl text-center h-[5.5rem] flex justify-center items-center font-[Arya] font-bold">
                {formatCurrency(Number(source.balance))}
              </div>
            </div>
            <div className="h-0.5 bg-slate-500 hr-gradient"></div>
            <div className="h-[85px] flex items-center justify-center">
              {/* Menu item */}
              {!props.isHideMenu && (
                <>
                  <div className="h-[4.375rem] flex justify-between items-center">
                    <div onClick={onClickTransferMoney} className="h-full w-20 cursor-pointer">
                      <div className="w-full h-full">
                        <div className="w-full flex justify-center">
                          <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                            <img src={iconTransfer} alt="icon-source" />
                          </div>
                        </div>
                        <div className="text-center h-[30px] flex items-center justify-center">
                          Transfer
                        </div>
                      </div>
                    </div>
                    <div onClick={onClickEditBalance} className="h-full w-20 cursor-pointer">
                      <div className="w-full h-full">
                        <div className="w-full flex justify-center">
                          <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                            <img src={iconEditBalance} alt="icon-source" />
                          </div>
                        </div>
                        <div className="text-center h-[30px] flex items-center justify-center">
                          Edit balance
                        </div>
                      </div>
                    </div>
                    <div onClick={onClickEditSource} className="h-full w-20 cursor-pointer">
                      <div className="w-full h-full">
                        <div className="w-full flex justify-center">
                          <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                            <img src={iconEdit} alt="icon-source" />
                          </div>
                        </div>
                        <div className="text-center h-[30px] flex items-center justify-center">
                          Edit
                        </div>
                      </div>
                    </div>
                    <div onClick={onOpenAskVisible} className="h-full w-20 cursor-pointer">
                      <div className="w-full h-full">
                        <div className="w-full flex justify-center">
                          <div className="w-[50px] h-[50px] border border-white bg-[#E9FFAC] rounded-[17px] flex justify-center items-center">
                            <img src={iconDelete} alt="icon-source" />
                          </div>
                        </div>
                        <div className="text-center h-[30px] flex items-center justify-center">
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </LinearWrapper>
    </div>
  );
};

export default SourceCard;
