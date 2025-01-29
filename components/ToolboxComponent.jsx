import { useState } from 'react';
import { Box, Tabs, Tab, Paper, Typography } from '@mui/material';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import AnimationIcon from '@mui/icons-material/MovieCreation';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ style, text, parent }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: parent,
    item: { type: style === 'heading' ? 'heading' : 'text', text, name: style }, 
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        margin: '8px',
        backgroundColor: '#f0f0f0',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
    >
      {text}
    </div>
  );
};

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const ToolboxComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '25%' }}>
      <Paper elevation={3} sx={{ p: 1, height: '85vh', display: 'flex', flexDirection: 'row' }}>
        <Tabs
          orientation="vertical"
          variant="standard"
          value={value}
          onChange={handleChange}
          sx={{ backgroundColor: '#f0f0f0', margin: '10px', borderRadius: '10px', '& .MuiTabs-indicator': { display: 'none' } }}
        >
          {tabsData.map(({ icon }, i) => (
            <Tab key={i} icon={icon} />
          ))}
        </Tabs>

        <Box sx={{ flexGrow: 1, p: 1 }}>
          {tabsData.map(({ label, items, parent }, i) => {
            return (
              <TabPanel key={i} value={value} index={i}>
                <Typography variant="h4">{label}</Typography>
                {items.map(({ style, text }, j) => (
                  <DraggableItem key={j} style={style} text={text} parent={parent} />
                ))}
              </TabPanel>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};

export default ToolboxComponent;

const tabsData = [
  {
    parent: 'TEXT_ITEM',
    icon: <FormatSizeIcon sx={{ fontSize: '40px' }} />,
    label: 'Heading',
    items: [
      { style: 'heading', text: 'Heading' },
      { style: 'text', text: 'Text' },
    ],
  },
  {
    parent: 'STYLE',
    icon: <TextFormatIcon sx={{ fontSize: '40px' }} />,
    label: 'Styles',
    items: [
      { style: 'bold', text: 'Bold' },
      { style: 'italic', text: 'Italic' },
      { style: 'strikeThrough', text: 'Strike Through' },
      { style: 'underline', text: 'Underline' },
    ],
  },
  {
    parent: 'ANIMATION',
    icon: <AnimationIcon sx={{ fontSize: '40px' }} />,
    label: 'Animations',
    items: [
      { style: 'highlight', text: 'Highlight' },
      { style: 'fade', text: 'Fade In' },
      { style: 'zoom', text: 'Zoom In' },
      { style: 'slide', text: 'Slide In' },
    ],
  },
];
