import React, { FC, useEffect, useState } from 'react';

const ProgressRing: FC<{
  radius: number;
  stroke: number;
  progress: number;
  icon?: string;
  color?: string;
}> = (props) => {
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);
  const normalizedRadius = props.radius - props.stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    const strokeDashoffset = circumference - (props.progress / 100) * circumference;
    setStrokeDashoffset(strokeDashoffset);
  }, [props.progress]);

  return (
    <div className="px-2">
      <div className="relative shadow shadow-green-800 rounded-full">
        <div className="w-20 h-20 flex items-center justify-center">
          <div className="left-0 w-[50px] h-[50px] border border-white bg-white flex justify-center items-center rounded-full">
            {<img src={props?.icon || '/assets/icon-other.svg'} alt="Icon" />}
          </div>
        </div>

        <svg className="absolute top-0 lef-0" height={props.radius * 2} width={props.radius * 2}>
          <circle
            className="circle-progress-ring"
            stroke={props.color || 'orange'}
            fill="transparent"
            strokeWidth={props.stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            stroke-width={props.stroke}
            r={normalizedRadius}
            cx={props.radius}
            cy={props.radius}
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressRing;
