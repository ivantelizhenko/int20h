import { type ReactNode } from 'react';

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

export interface SidebarItem {
  name: string;
  icon?: ReactNode;
  path?: string;
  nestedItems?: SidebarItem[];
}

const useSidebarItems = () => {
  const items: SidebarItem[] = [
    {
      name: 'Orders',
      icon: <ReceiptLongIcon />,
      path: '/orders',
    },
  ];

  return items;
};

export default useSidebarItems;
