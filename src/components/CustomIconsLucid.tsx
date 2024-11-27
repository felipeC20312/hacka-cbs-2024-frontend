import * as Lucide from 'lucide-react';

interface DynamicIconProps {
  iconName: string | undefined;
  color?: string;
  size?: number;
  isHover?: string;
  isActive?: boolean;
  isLogout?: boolean;
}

export function toPascalCase(str: string | undefined): string {
  if (str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9]/g, '');
  }

  return '---';
}

export default function ({ iconName, size, color }: DynamicIconProps) {
  //@ts-ignore
  const DynamicIcon = Lucide[toPascalCase(iconName)];

  if (!DynamicIcon) {
    return <Lucide.CloudDrizzle size={size ?? 24} color={color} />;
  }

  return <DynamicIcon size={size ?? 24} color={color} />;
}
