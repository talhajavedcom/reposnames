import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Box } from '@mui/material';

const GenerateVideo = ({ jsonData }) => {
  const frame = useCurrentFrame();
  const slides = jsonData?.slide || [];
  const getAnimatedStyle = (item, frame) => {
    const { styles = [], animation = [] } = item;
    let animatedStyle = {
      fontSize: item.component === 'heading' ? '24px' : '16px',
      fontWeight: styles.includes('bold') ? 'bold' : 'normal',
      fontStyle: styles.includes('italic') ? 'italic' : 'normal',
      color: 'black',
      lineHeight: 1.2,
      textDecoration:
        (styles.includes('strikeThrough') ? 'line-through ' : '') + (styles.includes('underline') ? 'underline' : '') || 'none',
      position: 'relative',
      display: 'inline-block',
    };

    if (animation.includes('fade')) {
      const opacity = interpolate(frame, [11, 40], [0, 1], { extrapolateRight: 'clamp' });
      animatedStyle.opacity = opacity;
    }

    if (animation.includes('zoom')) {
      const scale = interpolate(frame, [0, 30], [0.9, 1], { extrapolateRight: 'clamp' });
      animatedStyle.transform = `scale(${scale})`;
    }

    if (animation.includes('slide')) {
      const slideX = interpolate(frame, [0, 30], [-10, 0], { extrapolateRight: 'clamp' });
      animatedStyle.transform = `translateX(${slideX}%)`;
    }

    return animatedStyle;
  };

  const getHighlightStyle = (animation, frame) => {
    if (animation.includes('highlight')) {
      const highlightProgress = interpolate(frame, [30, 60], [0, 100], { extrapolateRight: 'clamp' });
      return {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '100%',
        width: `${highlightProgress}%`,
        backgroundColor: 'yellow',
        zIndex: 0,
        pointerEvents: 'none',
      };
    }
    return {};
  };

  return (
    <AbsoluteFill style={{ backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column' }}>
      {slides.map((item, index) => {
        const finalStyle = getAnimatedStyle(item, frame);
        const highlightStyle = getHighlightStyle(item.animation, frame);

        return (
          <div
            key={index}
            style={{
              marginBottom: '30px',
              position: 'relative',
            }}
          >
            <AbsoluteFill>
              <Box sx={{ height: '100%', padding: '24px', position: 'relative' }}>
                <Box sx={{ display: 'inline-block', position: 'relative', lineHeight: 1.2 }}>
                  {item.animation.includes('highlight') && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                      }}
                      style={highlightStyle}
                    />
                  )}
                  <span style={finalStyle}>{item.text}</span>
                </Box>
              </Box>
            </AbsoluteFill>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export default GenerateVideo;
