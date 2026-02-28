import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { type SxProps, type Theme, useTheme } from '@mui/material/styles';
import type { SidebarItem } from './utils/useSidebarItems';

interface SidebarItemViewProps {
  item: SidebarItem;
  isActive: boolean;
  hasChildren: boolean;
  isOpen?: boolean;
  onClick: () => void;
  depth?: number;
  sx?: SxProps<Theme>;
}

export const SidebarItemView = ({
  item,
  isActive,
  hasChildren,
  isOpen,
  onClick,
  sx,
}: SidebarItemViewProps) => {
  const theme = useTheme();

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton onClick={onClick} selected={isActive} sx={sx}>
        {item.icon && (
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: theme.palette.secondary.light,
            }}
          >
            {item.icon}
          </ListItemIcon>
        )}

        <ListItemText
          primary={
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              {item.name}
            </Typography>
          }
        />

        {hasChildren && (
          <Box
            component="span"
            className="expand-icon"
            sx={{
              color: theme.palette.secondary.light,
              opacity: 0.7,
              display: 'flex',
              transition: 'transform 0.2s',
            }}
          >
            {isOpen ? (
              <ExpandLess fontSize="small" />
            ) : (
              <ExpandMore fontSize="small" />
            )}
          </Box>
        )}
      </ListItemButton>
    </ListItem>
  );
};
