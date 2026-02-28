import { Box, CircularProgress, type SxProps, type Theme } from '@mui/material';

interface PageLoaderProps {
  sx?: SxProps<Theme>;
}

const PageLoader = ({ sx }: PageLoaderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexGrow: 1,
        ...sx,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
