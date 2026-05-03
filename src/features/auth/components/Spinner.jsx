import { Watch } from 'react-loader-spinner';

export function Spinner({ size = 20, color = '#ffffff' }) {
  return <Watch height={size} width={size} radius="9" color={color} ariaLabel="loading" />;
}
