import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Drawer, List, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { sidebarWidth } from 'utils/constants';
import useSidebarItems from './utils/useSidebarItems';
import { SidebarItemRenderer } from './SidebarItemRenderer';

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const sidebarItems = useSidebarItems();

  const handleToggle = (name: string) => {
    setOpenStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.custom.sidebar.background,
          color: theme.palette.secondary.light,
          borderRight: 'none',
        },
      }}
    >
      <Box
        sx={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          px: 3,
          width: 'fit-content',

          '&:hover': {
            cursor: 'pointer',
          },
        }}
        onClick={() => navigate('/orders')}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: theme.palette.common.white,
            fontSize: '1rem',
            lineHeight: 1.2,
          }}
        >
          Instant Wellness Kits
        </Typography>
      </Box>

      <Box sx={{ height: 16 }} />

      <List sx={{ pt: 0, px: 0 }}>
        {sidebarItems.map(item => (
          <SidebarItemRenderer
            key={item.name}
            item={item}
            isOpen={!!openStates[item.name]}
            onToggle={handleToggle}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
