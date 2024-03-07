import React, { useState } from 'react';
import classNames from 'classnames';
const Value = ({
  label,
  value,
  pourcent,
  size,
  type = '$',
  negative = false,
  comment,
  sign = 'auto',
  info,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const formatMoney = value => {
    const newFormat = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: sign,
      style: 'currency',
      currency: 'USD',
    });
    return newFormat;
  };
  const addPlusToPositive = number => {
    return number > 0 ? `+${number}` : number.toString();
  };

  const trafficLight = () => {
    if (!negative && pourcent > 0) {
      return true;
    } else if (negative && pourcent < 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <h2 className="label flex gap-1 relative">
        {label}
        {info && (
          <div className="flex items-center ">
            <button onClick={() => setTooltipOpen(!tooltipOpen)}>
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.50004 11.6167C9.04976 11.6167 11.1167 9.54971 11.1167 7C11.1167 4.45028 9.04976 2.38333 6.50004 2.38333C3.95033 2.38333 1.88337 4.45028 1.88337 7C1.88337 9.54971 3.95033 11.6167 6.50004 11.6167ZM6.50004 12.4167C9.49158 12.4167 11.9167 9.99154 11.9167 7C11.9167 4.00845 9.49158 1.58333 6.50004 1.58333C3.5085 1.58333 1.08337 4.00845 1.08337 7C1.08337 9.99154 3.5085 12.4167 6.50004 12.4167Z"
                  fill="#2F2F2E"
                />
                <path
                  d="M6.94702 5.34427H6.05127V4.52097H6.94702V5.34427ZM6.92068 9.2566H6.07762V5.9107H6.92068V9.2566Z"
                  fill="#2F2F2E"
                />
              </svg>
            </button>

            {tooltipOpen && (
              <div className="bg-white px-2 py-2 drop-shadow-lg absolute top-4 font-medium text-[10px] max-w-40">
                {info}
              </div>
            )}
          </div>
        )}
      </h2>
      <span
        className={classNames({
          'number-large': size === 'large',
          'number-small': size === 'small',
        })}
      >
        {type === '$' && formatMoney(value)}
        {type === 'kg' && value.toFixed(2) + ' kg'}
        {type === 'months' && value.toFixed(1) + ' months'}
      </span>
      <span>
        {comment && (
          <span className="opacity-50 text text-lg pointer-events-none ml-1	select-none text-right">
            {comment}
          </span>
        )}
        {pourcent && (
          <span
            className={classNames('pl-1  text-sm ', {
              'font-medium tracking-wide': size === 'large',
              'text-green': trafficLight(),
              'text-red-600': trafficLight() === false,
            })}
          >
            ({addPlusToPositive(pourcent.toFixed(1))}
            %)
          </span>
        )}
      </span>
    </div>
  );
};

export default Value;
