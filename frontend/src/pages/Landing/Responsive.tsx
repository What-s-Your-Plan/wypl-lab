import { LayoutStyle } from './Responsive.styled';

interface ResponsiveProps {
  type: string;
  children: JSX.Element | JSX.Element[];
}

function Responsive({ children }: ResponsiveProps) {
  return <LayoutStyle>{children}</LayoutStyle>;
}

export default Responsive;
