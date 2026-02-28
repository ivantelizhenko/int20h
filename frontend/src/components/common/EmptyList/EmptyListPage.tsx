import { Box, Stack, Typography, useTheme } from '@mui/material';

const EmptyListPage = ({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: theme.spacing(10, 0),
      }}
    >
      <Stack alignItems="center">
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 'bold',
            padding: '20px 0',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {message}
        </Typography>
      </Stack>
    </Box>
  );
};

export default EmptyListPage;
