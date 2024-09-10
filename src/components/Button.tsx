import styled from '@emotion/styled';
import { Button } from '@mui/material';

export const BaseButton = styled(Button)(({ size }) => ({
  borderRadius: '100px',
  padding: `${
    size == 'large' ? '12px 16px' : size == 'medium' ? '8px 16px' : '4px 8px'
  }`,
  fontSize: `${size == 'large' ? '20px' : size == 'medium' ? '16px' : '14px'}`,
  transition: '0.5s',
  backgroundSize: '200% auto',
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: 'var',
  },
  ':disabled': {
    backgroundColor: 'rgba(19, 19, 22, 0.1)',
  },
}));

export const UnderlineButton = ({ ...props }) => {
  return (
    <BaseButton className='hover:bg-transparent' disableTouchRipple {...props}>
      <span className='border-b border-primary-500 text-black'>
        {props.children}
      </span>
    </BaseButton>
  );
};
