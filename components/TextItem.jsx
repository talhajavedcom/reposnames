import { useState, useRef } from 'react';
import { Box, TextField, IconButton, Typography, Paper, Chip, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrop, useDrag } from 'react-dnd';

const TextItem = ({ item, index, onDelete, onUpdate, moveItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemData, setItemData] = useState({
    ...item,
    styles: item.styles || [],
    animation: item.animation || [],
  });
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ['SORTABLE_ITEM', 'STYLE', 'ANIMATION'],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(draggedItem, monitor) {
      if (!ref.current) return;

      if (draggedItem.type === 'SORTABLE_ITEM') {
        const dragIndex = draggedItem.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

        moveItem(dragIndex, hoverIndex);
        draggedItem.index = hoverIndex;
      }
    },
    drop(droppedItem, monitor) {
      const itemType = monitor.getItemType();

      if (itemType === 'STYLE' || itemType === 'ANIMATION') {
        const category = itemType === 'STYLE' ? 'styles' : 'animation';
        const newEffect = droppedItem.name;

        if (!itemData[category].includes(newEffect)) {
          const updatedData = {
            ...itemData,
            [category]: [...itemData[category], newEffect],
          };
          setItemData(updatedData);
          onUpdate(item.id, updatedData);
        }
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'SORTABLE_ITEM',
    item: () => ({
      id: item.id,
      index,
      type: 'SORTABLE_ITEM',
    }),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleTextChange = e => {
    const updatedData = {
      ...itemData,
      text: e.target.value,
    };
    setItemData(updatedData);
    onUpdate(item.id, updatedData);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleEffectDelete = (effectType, category) => {
    const updatedData = {
      ...itemData,
      [category]: itemData[category].filter(effect => effect !== effectType),
    };
    setItemData(updatedData);
    onUpdate(item.id, updatedData);
  };

  const hasEffect = (effect, category) => {
    return Array.isArray(itemData[category]) && itemData[category].includes(effect);
  };

  return (
    <Paper
      ref={ref}
      elevation={2}
      sx={{
        mx: 1,
        p: 2,
        cursor: 'move',
        backgroundColor: 'white',
        opacity: isDragging ? 0.4 : 1,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}
      data-handler-id={handlerId}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          {isEditing ? (
            <TextField
              value={itemData.text}
              onChange={handleTextChange}
              onBlur={handleBlur}
              size="small"
              fullWidth
              autoFocus
              multiline
              minRows={3}
            />
          ) : (
            <Typography
              variant={item.component === 'heading' ? 'h6' : 'body1'}
              sx={{
                wordBreak: 'break-word',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                maxWidth: '100%',
                textDecoration: hasEffect('strikeThrough', 'styles')
                  ? 'line-through'
                  : hasEffect('underline', 'styles')
                  ? 'underline'
                  : 'none',
                fontWeight: hasEffect('bold', 'styles') ? 'bold' : 'normal',
                fontStyle: hasEffect('italic', 'styles') ? 'italic' : 'normal',
              }}
              onClick={() => setIsEditing(true)}
            >
              {itemData.text}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={() => onDelete(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
        {itemData.styles.map((style, index) => (
          <Chip key={`style-${index}`} label={style} onDelete={() => handleEffectDelete(style, 'styles')} size="small" />
        ))}
        {itemData.animation.map((anim, index) => (
          <Chip key={`anim-${index}`} label={anim} onDelete={() => handleEffectDelete(anim, 'animation')} size="small" />
        ))}
      </Stack>
    </Paper>
  );
};

export default TextItem;
