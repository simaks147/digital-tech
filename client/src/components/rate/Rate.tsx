import React, { FC } from 'react';
import { ReactComponent as StarFullIcon } from "../../icons/star-full-icon.svg";
import { ReactComponent as StarEmptyIcon } from "../../icons/star-empty-icon.svg";

interface IProps {
  value: number,
  onChange?: Function,
  disabled?: boolean
}

const Rate: FC<IProps> = ({ value, onChange, disabled }) => (
  <>
    {
      [...Array(5)].map((_, i) => {
        const props = {
          key: i,
          style: (onChange && !disabled) ? { cursor: 'pointer' } : { cursor: 'default' },
          onClick: (onChange && !disabled) ? () => onChange(i + 1) : undefined
        }

        if (disabled) return <StarFullIcon {...props} className={'disabled'} />

        return i <= value - 1
          ? <StarFullIcon {...props} />
          : <StarEmptyIcon {...props} />
      })
    }
  </>
);

export default Rate;
