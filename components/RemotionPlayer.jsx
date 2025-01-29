import { Stack } from '@mui/material';
import { Player } from '@remotion/player';
import { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import GenerateVideo from './GenerateVideo';

const RemotionPlayer = ({ jsonData }) => {
  const playerRef = useRef(null);
  const handlePlay = () => playerRef.current?.play();
  const handlePause = () => playerRef.current?.pause();

  return (
    <Stack sx={{ height: '100%' }}>
      <Player
        ref={playerRef}
        component={GenerateVideo}
        inputProps={{ jsonData }} // Pass jsonData here
        durationInFrames={1120}
        fps={30}
        compositionWidth={300}
        compositionHeight={480}
        autoPlay={false}
        controls={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton color="primary" onClick={handlePlay} aria-label="play">
          <PlayArrowIcon />
        </IconButton>
        <IconButton color="secondary" onClick={handlePause} aria-label="pause">
          <PauseIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default RemotionPlayer;
