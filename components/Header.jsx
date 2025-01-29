import { useState } from 'react';
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { downloadVideo } from './downloadApi';

const Header = ({ jsonData }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await downloadVideo(jsonData);
    setIsDownloading(false);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Box sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar>
          <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
            <Typography>Remotion</Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={handleDownload} loading={isDownloading}>
              Download Video
            </Button>
            <IconButton />
          </Stack>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Header;
