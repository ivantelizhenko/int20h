import { alpha, useTheme } from '@mui/material/styles';

export const useSidebarItemStyles = () => {
  const theme = useTheme();
  const inactiveColor = theme.palette.secondary.light;
  const selectedBackground = theme.custom.sidebar.item.selected.background;
  const hoverBackground = alpha(theme.palette.common.white, 0.04);

  return (active: boolean, isChild: boolean = false) => ({
    minHeight: 44,
    mx: '16px',
    borderRadius: '8px',
    mb: 0.5,
    pl: isChild ? '56px' : undefined,
    transition: 'all 0.2s',

    color: inactiveColor,

    backgroundColor: active ? selectedBackground : 'transparent',

    '&:hover': {
      backgroundColor: active ? selectedBackground : hoverBackground,
      color: inactiveColor,
      '& .MuiListItemIcon-root': {
        color: inactiveColor,
      },
      '& .expand-icon': {
        color: inactiveColor,
      },
    },

    '&.Mui-selected': {
      backgroundColor: selectedBackground,
      color: inactiveColor,

      '&:hover': {
        backgroundColor: selectedBackground,
      },
    },
  });
};
