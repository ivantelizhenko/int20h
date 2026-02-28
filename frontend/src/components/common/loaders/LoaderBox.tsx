import { Box, type BoxProps, CircularProgress } from '@mui/material';

interface LoaderBoxProps extends BoxProps {
  loading: boolean;
  loader?: React.ReactNode;
  fullHeight?: boolean;
}

const LoaderBox = ({
  loading,
  children,
  loader,
  fullHeight = false,
  sx,
  ...otherProps
}: LoaderBoxProps) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: fullHeight ? '100%' : 'auto',
        minHeight: fullHeight ? 'unset' : '150px',
        width: '100%',
        flexGrow: 1,
        ...sx,
      }}
      role="status"
      aria-busy="true"
      {...otherProps}
    >
      {loader || <CircularProgress />}
    </Box>
  );
};

export default LoaderBox;
