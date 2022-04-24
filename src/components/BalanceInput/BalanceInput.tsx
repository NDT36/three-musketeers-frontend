import React, { FC, useEffect, useState } from 'react';
import iconMathMul from 'assets/icons-v2/icon-math-multiplication.svg';
import iconBackspace from 'assets/icons-v2/icon-backspace-erase.svg';
import iconDivision from 'assets/icons-v2/icon-math-division.svg';
import iconMinus from 'assets/icons-v2/icon-math-minus.svg';
import iconPlus from 'assets/icons-v2/icon-math-plus.svg';
import { calcFromString, formatCurrency } from 'utils';
import Modal from 'components/Modal';

interface BalanceInputProps {
  balance: number;
  onBalanceUpdate: (balance: number) => void;
}
const operators = ['+', '-', '*', '/'];
const BalanceInput: FC<BalanceInputProps> = (props) => {
  const [suggestions, setSuggestions] = useState([100000, 200000, 300000]);
  const [flag, setFlag] = useState<number>(props.balance);
  const [calc, setCalc] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenKeyboard = () => {
    setIsVisible(true);
  };
  // calcFromString

  const handleCloseKeyboard = () => {
    const result = calcFromString(calc.join('') + flag);
    props.onBalanceUpdate(result);
    setCalc([]);
    setFlag(result);
    setIsVisible(false);
  };

  const handlePressNumber = (num: number) => flag * 10 + num;

  const onPressBtn = (key: string) => {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key)) {
      const temp = handlePressNumber(Number(key));
      setFlag(temp);
    }

    if (operators.includes(key)) {
      const last = calc[calc.length - 1];
      if (flag === 0 && operators.includes(last)) {
        calc[calc.length - 1] = key;
      } else {
        calc.push(String(flag), key);
        setFlag(0);
      }

      setCalc([...calc]);
    }

    if (key === '000') {
      const temp = flag * 1000;
      setFlag(temp);
    }

    if (key === 'AC') {
      setFlag(0);
      setCalc([]);
    }

    if (key === '=') {
      handleCloseKeyboard();
    }

    if (key === 'C') {
      if (flag !== 0) setFlag(Math.floor(flag / 10));

      if (flag === 0) {
        const propped = calc.pop() as string;

        if (operators.includes(propped)) {
          const p = calc.pop() as string;
          // do nothing
          setFlag(Number(p));
        }

        if (!operators.includes(propped)) {
          setFlag(Math.floor(Number(propped || 0) / 10));
        }

        setCalc([...calc]);
      }
    }
  };

  useEffect(() => {
    if (flag !== 0) {
      const temp = flag < 1000 ? flag * 100 : flag;
      setSuggestions([temp * 10, temp * 100, temp * 1000]);
    }
  }, [flag]);

  useEffect(() => {
    if (props.balance === 0) {
      setFlag(0);
      setCalc([]);
    }
    if (props.balance !== 0) {
      setFlag(props.balance);
    }
  }, [props.balance]);

  const handleStr = (calc: string[], flag: number) => {
    calc = calc.map((item) => (operators.includes(item) ? item : formatCurrency(Number(item))));
    const str =
      calc.join(' ').split('*').join('×').split('/').join('÷') +
      ' ' +
      (flag ? formatCurrency(flag) : calc.length ? '' : '0');
    if (str.length > 20) return '...' + str.slice(str.length - 20, str.length);
    return str;
  };

  const onApplySuggest = (value: number) => {
    setFlag(value);
  };

  return (
    <>
      <div
        onClick={handleOpenKeyboard}
        className="h-[65px] text-gray-600 font-bold flex justify-center items-center select-none bg-white rounded-xl text-4xl"
      >
        {handleStr(calc, flag)}
      </div>
      <Modal isVisible={isVisible} isCalc={true} onClose={handleCloseKeyboard}>
        <div className="max-w-[450px] w-full mx-auto px-2.5 py-5 bg-red flex items-center justify-center rounded-t-2xl bg-[#F6F6F6] text-xl">
          <div className="w-full">
            {/* Suggestion */}
            <div className="h-[35px] flex justify-between text-primary font-bold text-xs mb-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => onApplySuggest(suggestion)}
                  className="w-[30%] cursor-pointer flex items-center justify-center bg-[#c1d0ca] rounded-md"
                >
                  {formatCurrency(suggestion)}
                </div>
              ))}
            </div>
            {/* Number */}
            <div className="flex justify-between font-bold text-white">
              <div className="w-1/4 h-full p-1">
                <div
                  onClick={() => onPressBtn('AC')}
                  className="h-[45px] bg-[#39725c] rounded-md flex items-center cursor-pointer justify-center"
                >
                  AC
                </div>
              </div>
              <div className="w-1/4 h-full p-1">
                <div
                  onClick={() => onPressBtn('/')}
                  className="h-[45px] bg-[#39725c] rounded-md flex items-center cursor-pointer justify-center"
                >
                  <img src={iconDivision} alt="/" />
                </div>
              </div>
              <div className="w-1/4 h-full p-1">
                <div
                  onClick={() => onPressBtn('*')}
                  className="h-[45px] bg-[#39725c] rounded-md flex items-center cursor-pointer justify-center"
                >
                  <img src={iconMathMul} alt="x" />
                </div>
              </div>
              <div className="w-1/4 h-full p-1">
                <div
                  onClick={() => onPressBtn('C')}
                  className="h-[45px] bg-[#39725c] rounded-md flex items-center cursor-pointer justify-center"
                >
                  <img src={iconBackspace} alt="C" />
                </div>
              </div>
            </div>
            {/* Number */}
            <div className="flex justify-between font-bold text-[#333]">
              <div onClick={() => onPressBtn('7')} className="w-1/4 h-full p-1">
                <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                  7
                </div>
              </div>
              <div onClick={() => onPressBtn('8')} className="w-1/4 h-full p-1">
                <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                  8
                </div>
              </div>
              <div onClick={() => onPressBtn('9')} className="w-1/4 h-full p-1">
                <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                  9
                </div>
              </div>
              <div className="w-1/4 h-full p-1">
                <div
                  onClick={() => onPressBtn('-')}
                  className="h-[45px] bg-[#39725c] text-white rounded-md flex items-center cursor-pointer justify-center"
                >
                  <img src={iconMinus} alt="-" />
                </div>
              </div>
            </div>
            {/* Number */}
            <div className="flex justify-between font-bold text-[#333]">
              <div onClick={() => onPressBtn('4')} className="w-1/4 h-full p-1">
                <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                  4
                </div>
              </div>
              <div onClick={() => onPressBtn('5')} className="w-1/4 h-full p-1">
                <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                  5
                </div>
              </div>
              <div onClick={() => onPressBtn('6')} className="w-1/4 h-full p-1">
                <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                  6
                </div>
              </div>
              <div onClick={() => onPressBtn('+')} className="w-1/4 h-full p-1">
                <div className="h-[45px] bg-[#39725c] text-white rounded-md flex items-center cursor-pointer justify-center">
                  <img src={iconPlus} alt="+" />
                </div>
              </div>
            </div>
            {/* Number complex */}
            <div className="flex justify-between font-bold text-[#333]">
              <div className="w-3/4 flex flex-col">
                <div className="w-full flex">
                  <div onClick={() => onPressBtn('1')} className="w-1/3 h-full p-1">
                    <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                      1
                    </div>
                  </div>
                  <div onClick={() => onPressBtn('2')} className="w-1/3 h-full p-1">
                    <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                      2
                    </div>
                  </div>
                  <div onClick={() => onPressBtn('3')} className="w-1/3 h-full p-1">
                    <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                      3
                    </div>
                  </div>
                </div>
                <div className="w-full flex">
                  <div onClick={() => onPressBtn('000')} className="w-2/3 h-full p-1">
                    <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                      000
                    </div>
                  </div>
                  <div onClick={() => onPressBtn('0')} className="w-1/3 h-full p-1">
                    <div className="h-[45px] bg-white rounded-md flex items-center cursor-pointer justify-center">
                      0
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => onPressBtn('=')} className="w-1/4 p-1">
                <div className="bg-[#39725c] text-white rounded-md flex items-center cursor-pointer justify-center h-full">
                  =
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BalanceInput;
