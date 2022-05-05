import React, { FC, useState } from 'react';
import iconPencil from 'assets/icons-v2/icon-pencil.svg';
import Popup from 'components/Popup';
import moment from 'moment';
import CommonButton from 'components/CommonButton/Index';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  onEdit?: (date: string) => void;
  isDisableEdit?: boolean;
  disabled?: boolean;
  defaultValue?: string;
}
const NoFormDateInput: FC<IProps> = function (props) {
  const [visible, setVisible] = useState(false);
  const defaultValue = props.defaultValue ? moment(props.defaultValue) : moment();
  const [year, setYear] = useState(defaultValue.get('year'));
  const [month, setMonth] = useState(defaultValue.get('month'));
  const [date, setDate] = useState(defaultValue.get('date'));

  const getDateString = () => `${year}/${month + 1}/${date}`;

  const closeModalEdit = () => {
    if (props.onEdit) {
      props.onEdit(moment(getDateString()).format('YYYY-MM-DD'));
    }

    setVisible(false);
  };
  const openModalEdit = () => {
    setVisible(true);
  };

  const dateAdd = (key: string, num: number) => {
    if (key === 'year') {
      const newObj = moment(getDateString()).add(num, 'year');
      setYear(newObj.get('year'));
      setMonth(newObj.get('month'));
      setDate(newObj.get('date'));
    }

    if (key === 'month') {
      const newObj = moment(getDateString()).add(num, 'month');
      setYear(newObj.get('year'));
      setMonth(newObj.get('month'));
      setDate(newObj.get('date'));
    }

    if (key === 'day') {
      const newDayObj = moment(getDateString()).add(num, 'day');
      setYear(newDayObj.get('year'));
      setMonth(newDayObj.get('month'));
      setDate(newDayObj.get('date'));
    }
  };
  return (
    <>
      <Popup isVisible={visible} onClose={closeModalEdit}>
        <div className="flex items-center justify-center text-[#5c5c5c] p-5 select-none bg-[#f6f6f6]">
          <div className="w-[220px] flex">
            <div className="w-20 mx-[1px]">
              <div
                onClick={() => dateAdd('year', 1)}
                className="w-full h-[60px] rounded-md border border-gray-600 bg-white flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_654_842)">
                    <path
                      d="M5.0848 0H8.9152C9.03607 0 9.15199 0.048065 9.23745 0.133621C9.32292 0.219178 9.37093 0.335217 9.37093 0.456212V4.62713H13.5454C13.6663 4.62713 13.7822 4.67519 13.8677 4.76075C13.9531 4.8463 14.0011 4.96234 14.0011 5.08334V8.91666C14.0011 9.03765 13.9531 9.15369 13.8677 9.23925C13.7822 9.3248 13.6663 9.37287 13.5454 9.37287H9.36979V13.5449C9.36979 13.6659 9.32178 13.782 9.23631 13.8675C9.15085 13.9531 9.03493 14.0011 8.91406 14.0011H5.0848C4.96393 14.0011 4.84802 13.9531 4.76255 13.8675C4.67708 13.782 4.62907 13.6659 4.62907 13.5449V9.37287H0.455729C0.334862 9.37287 0.218946 9.3248 0.13348 9.23925C0.0480142 9.15369 0 9.03765 0 8.91666V5.0822C0 4.9612 0.0480142 4.84516 0.13348 4.75961C0.218946 4.67405 0.334862 4.62599 0.455729 4.62599H4.62907V0.456212C4.62907 0.335217 4.67708 0.219178 4.76255 0.133621C4.84802 0.048065 4.96393 0 5.0848 0V0Z"
                      fill="#337762"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_654_842">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="w-full h-[80px] rounded-md border border-gray-600 bg-white flex items-center justify-center my-0.5">
                <div className="text-center relative w-full font-bold">
                  <div className="text-[8px] h-4">Years</div>
                  <div className="text-3xl">{year}</div>
                </div>
              </div>
              <div
                onClick={() => dateAdd('year', -1)}
                className="w-full h-[60px] rounded-md border border-gray-600 bg-white flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="40"
                  height="15"
                  viewBox="0 0 16 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4792 1C15.6173 1 15.7498 1.0405 15.8475 1.1126C15.9451 1.18469 16 1.28247 16 1.38443V4.61557C16 4.71753 15.9451 4.81531 15.8475 4.8874C15.7498 4.9595 15.6173 5 15.4792 5H0.520833C0.3827 5 0.250224 4.9595 0.152549 4.8874C0.0548734 4.81531 0 4.71753 0 4.61557V1.38443C0 1.28247 0.0548734 1.18469 0.152549 1.1126C0.250224 1.0405 0.3827 1 0.520833 1H15.4792Z"
                    fill="#337762"
                  />
                </svg>
              </div>
            </div>
            <div className="w-20 mx-[1px]">
              <div
                onClick={() => dateAdd('month', 1)}
                className="w-full h-[60px] rounded-md border border-gray-600 bg-white flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_654_842)">
                    <path
                      d="M5.0848 0H8.9152C9.03607 0 9.15199 0.048065 9.23745 0.133621C9.32292 0.219178 9.37093 0.335217 9.37093 0.456212V4.62713H13.5454C13.6663 4.62713 13.7822 4.67519 13.8677 4.76075C13.9531 4.8463 14.0011 4.96234 14.0011 5.08334V8.91666C14.0011 9.03765 13.9531 9.15369 13.8677 9.23925C13.7822 9.3248 13.6663 9.37287 13.5454 9.37287H9.36979V13.5449C9.36979 13.6659 9.32178 13.782 9.23631 13.8675C9.15085 13.9531 9.03493 14.0011 8.91406 14.0011H5.0848C4.96393 14.0011 4.84802 13.9531 4.76255 13.8675C4.67708 13.782 4.62907 13.6659 4.62907 13.5449V9.37287H0.455729C0.334862 9.37287 0.218946 9.3248 0.13348 9.23925C0.0480142 9.15369 0 9.03765 0 8.91666V5.0822C0 4.9612 0.0480142 4.84516 0.13348 4.75961C0.218946 4.67405 0.334862 4.62599 0.455729 4.62599H4.62907V0.456212C4.62907 0.335217 4.67708 0.219178 4.76255 0.133621C4.84802 0.048065 4.96393 0 5.0848 0V0Z"
                      fill="#337762"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_654_842">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="w-full h-[80px] rounded-md border border-gray-600 bg-white flex items-center justify-center my-0.5">
                <div className="text-center relative w-full font-bold">
                  <div className="text-[8px] h-4">Month</div>
                  <div className="text-3xl">{month < 9 ? '0' + String(month + 1) : month + 1}</div>
                </div>
              </div>
              <div
                onClick={() => dateAdd('month', -1)}
                className="w-full h-[60px] rounded-md border border-gray-600 bg-white flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="40"
                  height="15"
                  viewBox="0 0 16 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4792 1C15.6173 1 15.7498 1.0405 15.8475 1.1126C15.9451 1.18469 16 1.28247 16 1.38443V4.61557C16 4.71753 15.9451 4.81531 15.8475 4.8874C15.7498 4.9595 15.6173 5 15.4792 5H0.520833C0.3827 5 0.250224 4.9595 0.152549 4.8874C0.0548734 4.81531 0 4.71753 0 4.61557V1.38443C0 1.28247 0.0548734 1.18469 0.152549 1.1126C0.250224 1.0405 0.3827 1 0.520833 1H15.4792Z"
                    fill="#337762"
                  />
                </svg>
              </div>
            </div>
            <div className="w-20 mx-[1px]">
              <div
                onClick={() => dateAdd('day', 1)}
                className="w-full h-[60px] rounded-md border border-gray-600 bg-white flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_654_842)">
                    <path
                      d="M5.0848 0H8.9152C9.03607 0 9.15199 0.048065 9.23745 0.133621C9.32292 0.219178 9.37093 0.335217 9.37093 0.456212V4.62713H13.5454C13.6663 4.62713 13.7822 4.67519 13.8677 4.76075C13.9531 4.8463 14.0011 4.96234 14.0011 5.08334V8.91666C14.0011 9.03765 13.9531 9.15369 13.8677 9.23925C13.7822 9.3248 13.6663 9.37287 13.5454 9.37287H9.36979V13.5449C9.36979 13.6659 9.32178 13.782 9.23631 13.8675C9.15085 13.9531 9.03493 14.0011 8.91406 14.0011H5.0848C4.96393 14.0011 4.84802 13.9531 4.76255 13.8675C4.67708 13.782 4.62907 13.6659 4.62907 13.5449V9.37287H0.455729C0.334862 9.37287 0.218946 9.3248 0.13348 9.23925C0.0480142 9.15369 0 9.03765 0 8.91666V5.0822C0 4.9612 0.0480142 4.84516 0.13348 4.75961C0.218946 4.67405 0.334862 4.62599 0.455729 4.62599H4.62907V0.456212C4.62907 0.335217 4.67708 0.219178 4.76255 0.133621C4.84802 0.048065 4.96393 0 5.0848 0V0Z"
                      fill="#337762"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_654_842">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="w-full h-[80px] rounded-md border border-gray-600 bg-white flex items-center justify-center my-0.5">
                <div className="text-center relative w-full font-bold">
                  <div className="text-[8px] h-4">Day</div>
                  <div className="text-3xl">{date < 10 ? '0' + String(date) : date}</div>
                </div>
              </div>
              <div
                onClick={() => dateAdd('day', -1)}
                className="w-full h-[60px] rounded-md border border-gray-600 bg-white flex items-center justify-center cursor-pointer"
              >
                <svg
                  width="40"
                  height="15"
                  viewBox="0 0 16 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4792 1C15.6173 1 15.7498 1.0405 15.8475 1.1126C15.9451 1.18469 16 1.28247 16 1.38443V4.61557C16 4.71753 15.9451 4.81531 15.8475 4.8874C15.7498 4.9595 15.6173 5 15.4792 5H0.520833C0.3827 5 0.250224 4.9595 0.152549 4.8874C0.0548734 4.81531 0 4.71753 0 4.61557V1.38443C0 1.28247 0.0548734 1.18469 0.152549 1.1126C0.250224 1.0405 0.3827 1 0.520833 1H15.4792Z"
                    fill="#337762"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center">
          <CommonButton
            onClick={(e) => {
              e.preventDefault();
              closeModalEdit();
            }}
            className="bg-secondary font-bold text-3xl h-[60px] rounded-lg border-white"
          >
            Done
          </CommonButton>
        </div>
      </Popup>
      <div className="h-[90px] w-full flex flex-col " onClick={openModalEdit}>
        <div className="h-[25px]">{props.title}</div>
        <div className="relative h-full w-full bg-secondary flex flex-row items-center shadow rounded-[12px]">
          {props.disabled && (
            <div className="w-full h-full absolute top-0 left-0 bg-secondary opacity-70 rounded-[12px]"></div>
          )}
          {/* Icon */}
          <div className="h-[65px] w-[65px] p-[7.5px]">
            <div className="w-[50px] h-[50px] border border-white bg-white flex justify-center items-center rounded-[17px]">
              <svg
                width="24"
                height="26"
                viewBox="0 0 24 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.7505 26H2.2495C1.65354 25.9978 1.0826 25.7465 0.661194 25.301C0.239787 24.8554 0.0021096 24.2518 0 23.6217L0 4.77132C0.0021096 4.14126 0.239787 3.53763 0.661194 3.09211C1.0826 2.64658 1.65354 2.3953 2.2495 2.39307H4.32488V5.31934C4.32673 5.71062 4.41168 6.09647 4.57344 6.44841C4.73521 6.80034 4.96966 7.10938 5.25951 7.3527C5.77793 7.79641 6.42472 8.03851 7.09173 8.03851C7.75874 8.03851 8.40553 7.79641 8.92395 7.3527C9.21379 7.10938 9.44825 6.80034 9.61001 6.44841C9.77178 6.09647 9.85672 5.71062 9.85857 5.31934V2.39307H14.0494V5.31934C14.0512 5.71062 14.1362 6.09647 14.2979 6.44841C14.4597 6.80034 14.6941 7.10938 14.984 7.3527C15.5024 7.79641 16.1492 8.03851 16.8162 8.03851C17.4832 8.03851 18.13 7.79641 18.6484 7.3527C18.9383 7.10938 19.1727 6.80034 19.3345 6.44841C19.4963 6.09647 19.5812 5.71062 19.5831 5.31934V2.39307H21.7505C22.3461 2.3964 22.9165 2.64804 23.3377 3.09333C23.7588 3.53861 23.9968 4.1416 24 4.77132V23.6217C23.9984 24.252 23.7609 24.8559 23.3394 25.3016C22.9179 25.7472 22.3466 25.9983 21.7505 26ZM16.7272 12.0119H19.9493C20.0564 12.0124 20.1592 12.0567 20.2361 12.1356C20.313 12.2145 20.358 12.3218 20.3616 12.4351V15.2703C20.358 15.3836 20.313 15.4909 20.2361 15.5698C20.1592 15.6487 20.0564 15.693 19.9493 15.6935H16.7272C16.622 15.6903 16.5219 15.6447 16.4475 15.566C16.373 15.4874 16.3299 15.3816 16.3269 15.2703V12.4456C16.3294 12.3342 16.3724 12.2282 16.4469 12.1494C16.5215 12.0706 16.6218 12.0251 16.7272 12.0225V12.0119ZM10.4209 12.0119H13.6451C13.7503 12.0151 13.8504 12.0607 13.9248 12.1394C13.9992 12.218 14.0423 12.3238 14.0454 12.4351V15.2703C14.0419 15.3814 13.9986 15.4869 13.9243 15.5655C13.8499 15.6441 13.7501 15.6898 13.6451 15.6935H10.4209C10.3157 15.6903 10.2157 15.6447 10.1413 15.566C10.0668 15.4874 10.0237 15.3816 10.0207 15.2703V12.4456C10.0237 12.3344 10.0668 12.2286 10.1413 12.1499C10.2157 12.0713 10.3157 12.0257 10.4209 12.0225V12.0119ZM4.0487 12.0119H7.27285C7.37805 12.0151 7.47811 12.0607 7.55253 12.1394C7.62695 12.218 7.67009 12.3238 7.67312 12.4351V15.2703C7.66962 15.3814 7.62633 15.4869 7.55201 15.5655C7.47769 15.6441 7.3779 15.6898 7.27285 15.6935H4.0487C3.94175 15.693 3.83918 15.6486 3.76262 15.5696C3.68607 15.4907 3.64154 15.3834 3.63843 15.2703V12.4456C3.64104 12.3324 3.68541 12.2248 3.76207 12.1457C3.83873 12.0667 3.9416 12.0224 4.0487 12.0225V12.0119ZM16.7272 18.04H19.9493C20.0564 18.0405 20.1592 18.0849 20.2361 18.1638C20.313 18.2427 20.358 18.35 20.3616 18.4632V21.2985C20.361 21.4137 20.3174 21.5241 20.2401 21.6053C20.1629 21.6866 20.0583 21.7323 19.9493 21.7323H16.7272C16.6203 21.729 16.5187 21.6819 16.4441 21.601C16.3694 21.52 16.3274 21.4116 16.3269 21.2985V18.4738C16.3299 18.3626 16.373 18.2568 16.4475 18.1781C16.5219 18.0994 16.622 18.0538 16.7272 18.0506V18.04ZM10.4209 18.04H13.6451C13.7503 18.0432 13.8504 18.0888 13.9248 18.1675C13.9992 18.2462 14.0423 18.352 14.0454 18.4632V21.2985C14.0449 21.4116 14.0029 21.52 13.9282 21.601C13.8535 21.6819 13.752 21.729 13.6451 21.7323H10.4209C10.314 21.729 10.2125 21.6819 10.1379 21.601C10.0632 21.52 10.0212 21.4116 10.0207 21.2985V18.4738C10.0242 18.3627 10.0675 18.2572 10.1418 18.1787C10.2161 18.1001 10.3159 18.0543 10.4209 18.0506V18.04ZM4.0487 18.04H7.27285C7.37805 18.0432 7.47811 18.0888 7.55253 18.1675C7.62695 18.2462 7.67009 18.352 7.67312 18.4632V21.2985C7.67264 21.4116 7.63063 21.52 7.55594 21.601C7.48126 21.6819 7.37975 21.729 7.27285 21.7323H4.0487C3.94005 21.7317 3.836 21.6858 3.75917 21.6046C3.68235 21.5234 3.63895 21.4134 3.63843 21.2985V18.4738C3.64154 18.3608 3.68607 18.2535 3.76262 18.1745C3.83918 18.0955 3.94175 18.0511 4.0487 18.0506V18.04ZM15.7305 0.941569C15.7305 0.423177 16.2108 0 16.8112 0C17.4116 0 17.8979 0.423177 17.8979 0.941569V5.31934C17.8979 5.83984 17.4136 6.26091 16.8112 6.26091C16.2088 6.26091 15.7265 5.83773 15.7265 5.31934V0.941569H15.7305ZM6.004 0.941569C6.004 0.423177 6.49233 0 7.09273 0C7.69313 0 8.17745 0.423177 8.17745 0.941569V5.31934C8.17745 5.83984 7.69313 6.26091 7.09273 6.26091C6.49233 6.26091 6.004 5.83984 6.004 5.31934V0.941569ZM0.72048 9.28027V23.3678C0.722063 23.8634 0.908966 24.3382 1.24041 24.6886C1.57185 25.039 2.02093 25.2366 2.48966 25.2383H21.5023C21.9714 25.2372 22.421 25.0398 22.7529 24.6893C23.0848 24.3389 23.2719 23.8638 23.2735 23.3678V9.28027H0.72048Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="w-full p-[7.5px]">{props.children}</div>
          {!props.isDisableEdit && (
            <div className="h-[65px] w-[65px] p-[7.5px] cursor-pointer">
              <div className="w-[50px] h-[50px] rounded-[17px] flex justify-center items-center">
                <img src={iconPencil} alt="Edit" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NoFormDateInput;
