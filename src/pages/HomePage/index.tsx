import { logout } from 'api/axios';
import React from 'react';
import visibility from 'assets/icons/visibility.png';
import Header from 'components/Header';
import { useSelector } from 'react-redux';
import { AppState } from 'state';
import { formatLongString } from 'utils';

function HomePage() {
  const profile = useSelector((state: AppState) => state.user.profile);

  const formatName = (name: string) => {
    const result = formatLongString(name, 20);
    return 'Hi ' + result;
  };

  return (
    <div className="px-2">
      <Header title={formatName(profile?.name || 'There!')} />
      <div className="relative h-[75px] py-3">
        <div className="absolute top-0 left-2 bg-white px-2">Balance</div>
        <div className="flex border border-gray-600  rounded-md px-3 text-right">
          <div className="h-[50px] w-full flex items-center text-2xl font-bold">
            100.000.000 VND
          </div>
          <div className="h-[50px] w-[60px] flex items-center justify-center">
            <img src={visibility} alt="Visibility" />
          </div>
        </div>
      </div>
      <div onClick={() => logout()}>Logout</div>
    </div>
  );
}

export default HomePage;
