import { useLocation, useNavigate } from 'react-router-dom';

import { Collapse, List } from '@mui/material';

import type { SidebarItem } from './utils/useSidebarItems';
import { SidebarItemView } from './SidebarItemView';
import { useSidebarItemStyles } from './utils/useSidebarStyle';

interface ItemProps {
  item: SidebarItem;
  isOpen: boolean;
  onToggle: (name: string) => void;
}

export const SidebarItemRenderer = ({ item, isOpen, onToggle }: ItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const getItemStyles = useSidebarItemStyles();

  const validChildren = item.nestedItems ?? [];

  const hasChildren = validChildren.length > 0;

  const isParentActive = hasChildren
    ? (validChildren.some(
        child => child.path && location.pathname.startsWith(child.path),
      ) ?? false)
    : item.path && location.pathname.endsWith(item.path);

  const handleNavigation = (targetItem: SidebarItem) => {
    if (!targetItem.path) return;

    navigate(targetItem.path);
  };

  const handleParentClick = () => {
    if (hasChildren) {
      onToggle(item.name);
    } else {
      handleNavigation(item);
    }
  };

  return (
    <>
      <SidebarItemView
        item={item}
        isActive={!!isParentActive && !hasChildren}
        hasChildren={hasChildren}
        isOpen={isOpen}
        onClick={handleParentClick}
        sx={getItemStyles(!!isParentActive && !hasChildren, false)}
      />

      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {validChildren.map(child => {
              const isChildActive =
                !!child.path && location.pathname.endsWith(child.path);

              return (
                <SidebarItemView
                  key={child.name}
                  item={child}
                  isActive={isChildActive}
                  hasChildren={false}
                  isOpen={false}
                  onClick={() => handleNavigation(child)}
                  sx={getItemStyles(isChildActive, true)}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};
