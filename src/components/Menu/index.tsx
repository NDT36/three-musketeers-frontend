import React, { FC, useEffect, useMemo, useState } from 'react';
import MenuItem from './MenuItem';
import iconHome from 'assets/icons-v2/icon-home.svg';
import iconGroup from 'assets/icons/icon-group.png';
import iconAdd from 'assets/icons-v2/icon-add.svg';
import iconNotify from 'assets/icons/icon-notification.png';
import iconMore from 'assets/icons/icon-more.png';
import { MenuKey, RoutePath } from 'types/enum';
import { useLocation, useNavigate } from 'react-router-dom';
import { reverseObjectEnum } from 'utils';
import IconAdd from 'assets/icons-v2/iconAddComponent';

interface IProps {}

const Menu: FC<IProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState({
    [`${MenuKey.HOME}`]: false,
    [`${MenuKey.GROUP}`]: false,
    [`${MenuKey.CREATE}`]: false,
    [`${MenuKey.NOTIFY}`]: false,
    [`${MenuKey.MORE}`]: false,
  });

  const navigatePath = useMemo(
    () => ({
      [`${MenuKey.HOME}`]: RoutePath.HOME,
      [`${MenuKey.GROUP}`]: RoutePath.GROUP,
      [`${MenuKey.CREATE}`]: RoutePath.CREATE,
      [`${MenuKey.NOTIFY}`]: RoutePath.NOTIFICATION,
      [`${MenuKey.MORE}`]: RoutePath.MORE,
    }),
    []
  );

  const handleChangeTab = (key: MenuKey) => navigate(navigatePath[key]);

  useEffect(() => {
    const menuKey = reverseObjectEnum(navigatePath)[location.pathname];

    setActive({
      [`${MenuKey.HOME}`]: false,
      [`${MenuKey.GROUP}`]: false,
      [`${MenuKey.CREATE}`]: false,
      [`${MenuKey.NOTIFY}`]: false,
      [`${MenuKey.MORE}`]: false,
      [menuKey]: true,
    });
  }, [navigatePath, location.pathname]);

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <div className="h-[75px] flex flex-row w-full max-w-[450px] bg-gray-100 rounded-br-lg rounded-bl-lg border-t border-t-gray-300 font-bold">
        <MenuItem
          label={MenuKey.HOME}
          onChangeTab={handleChangeTab}
          icon={iconHome}
          active={active[MenuKey.HOME]}
        />
        <MenuItem
          label={MenuKey.GROUP}
          onChangeTab={handleChangeTab}
          icon={iconGroup}
          active={active[MenuKey.GROUP]}
        />
        <MenuItem
          label={MenuKey.CREATE}
          onChangeTab={handleChangeTab}
          icon={<IconAdd />}
          active={active[MenuKey.CREATE]}
        />
        <MenuItem
          label={MenuKey.NOTIFY}
          onChangeTab={handleChangeTab}
          icon={iconNotify}
          active={active[MenuKey.NOTIFY]}
        />

        <MenuItem
          label={MenuKey.MORE}
          onChangeTab={handleChangeTab}
          icon={iconMore}
          active={active[MenuKey.MORE]}
        />
      </div>
    </div>
  );
};

export default Menu;
