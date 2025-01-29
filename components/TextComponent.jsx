import { Box, Paper } from '@mui/material';
import { useDrop } from 'react-dnd';
import TextItem from './TextItem';

const TextComponent = ({ items, onDrop, onDelete, onUpdate, moveItem }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ['TEXT_ITEM', 'SORTABLE_ITEM', 'STYLE', 'ANIMATION'],
    drop: (item, monitor) => {
      const itemType = monitor.getItemType();

      if (!item.sourceType && itemType === 'TEXT_ITEM') {
        onDrop({
          ...item,
          sourceType: 'TOOLBOX',
          styles: [],
          animation: [],
          time_in_seconds: 3,
        });
        return;
      }

      if (itemType === 'STYLE' || itemType === 'ANIMATION') {
        return;
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box sx={{ width: '55%' }}>
      <Paper
        ref={drop}
        elevation={3}
        sx={{
          p: 1,
          height: '85vh',
          bgcolor: isOver ? '#baeaf380' : 'background.paper',
          transition: 'background-color 0.2s ease',
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minHeight: '200px',
            '& > *': {
              transition: 'transform 0.2s ease',
            },
          }}
        >
          {items.map((item, index) => (
            <TextItem key={item.id} index={index} item={item} onDelete={onDelete} onUpdate={onUpdate} moveItem={moveItem} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default TextComponent;
