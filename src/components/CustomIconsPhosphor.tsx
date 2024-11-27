import * as Icon from '@phosphor-icons/react';

interface DynamicIconProps {
  iconName: string;
  size?: number;
  isHover?: string;
  isActive?: boolean;
  isLogout?: boolean;
}

export default function ({
  iconName,
  size,
  isHover,
  isActive,
  isLogout,
}: DynamicIconProps) {
  //@ts-ignore
  const DynamicIcon = Icon[iconName];

  return (
    <DynamicIcon
      size={size ?? 24}
      // color={
      //   isHover || isActive
      //     ? theme.palette.primary.main
      //     : isLogout
      //     ? theme.palette.error.main
      //     : '#111111'
      // }
    />
  );
}
