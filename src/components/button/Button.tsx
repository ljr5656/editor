import React, { ReactNode } from 'react';

// Button 组件
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> & { Group: React.FC<ButtonGroupProps> } = ({
  children,
  onClick,
}) => {
  return <button onClick={onClick}>{children}</button>;
};

// ButtonGroup 组件，支持插槽
type ButtonGroupProps = {
  children: ReactNode;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return <div className='button-group'>{children}</div>;
};

Button.Group = ButtonGroup;

export default Button;
