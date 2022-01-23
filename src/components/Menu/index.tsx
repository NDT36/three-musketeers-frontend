import React, { FC, useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import iconHome from 'assets/icons/icon-home.png';
import iconGroup from 'assets/icons/icon-group.png';
import iconAdd from 'assets/icons/icon-add.png';
import iconWallet from 'assets/icons/icon-wallet.png';
import iconMore from 'assets/icons/icon-more.png';
import { MenuKey, RoutePath } from 'types/enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { reverseObjectEnum } from 'utils';

interface IProps {}

const initTabState = {
  [`${MenuKey.HOME}`]: false,
  [`${MenuKey.GROUP}`]: false,
  [`${MenuKey.CREATE}`]: false,
  [`${MenuKey.ASSET}`]: false,
  [`${MenuKey.MORE}`]: false,
};

const navigatePath = {
  [`${MenuKey.HOME}`]: RoutePath.HOME,
  [`${MenuKey.GROUP}`]: RoutePath.GROUP,
  [`${MenuKey.CREATE}`]: RoutePath.CREATE,
  [`${MenuKey.ASSET}`]: RoutePath.ASSET,
  [`${MenuKey.MORE}`]: RoutePath.MORE,
};

const Menu: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(initTabState);

  const handleChangeTab = (key: MenuKey) => navigate(navigatePath[key]);

  useEffect(() => {
    const menuKey = reverseObjectEnum(navigatePath)[location.pathname];
    if (menuKey) setActive({ ...initTabState, [menuKey]: true });
  }, [navigatePath, location.pathname, initTabState]);

  return (
    <div className="absolute bottom-0 left-0 h-[75px] flex flex-row w-full bg-gray-100 rounded-br-lg rounded-bl-lg border-t border-t-gray-300 font-bold">
      <MenuItem
        label={MenuKey.HOME}
        onChangeTab={handleChangeTab}
        icon={iconHome}
        active={active[MenuKey.HOME]}
      />
      <MenuItem
        label={MenuKey.ASSET}
        onChangeTab={handleChangeTab}
        icon={iconWallet}
        active={active[MenuKey.ASSET]}
      />
      <MenuItem
        label={MenuKey.CREATE}
        onChangeTab={handleChangeTab}
        icon={iconAdd}
        active={active[MenuKey.CREATE]}
      />
      <MenuItem
        label={MenuKey.GROUP}
        onChangeTab={handleChangeTab}
        icon={iconGroup}
        active={active[MenuKey.GROUP]}
      />
      <MenuItem
        label={MenuKey.MORE}
        onChangeTab={handleChangeTab}
        icon={iconMore}
        active={active[MenuKey.MORE]}
      />
    </div>
  );
};

export default Menu;
