import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Paper } from '@mui/material';
import TextComponent from './components/TextComponent';
import ToolboxComponent from './components/ToolboxComponent';
import RemotionPlayer from './components/RemotionPlayer';
import { useState } from 'react';

const MainLayout = ({jsonData, setJsonData }) => {
    const [canvasItems, setCanvasItems] = useState([]);
  const updateJSON = items => {
    setJsonData({
      slide: items.map(item => ({
        component: item.type,
        text: item.text,
        styles: item.styles,
        animation: item.animation,
        time_in_seconds: 3,
      })),
    });
  };

  const handleDrop = item => {
    const newItem = {
      id: (canvasItems.length + 1).toString(),
      type: item.type,
      text: item.text,
      styles: [],
      animation: [],
      time_in_seconds: 3,
    };

    const updatedItems = [...canvasItems, newItem];
    setCanvasItems(updatedItems);
    updateJSON(updatedItems);
  };

  const handleDeleteItem = id => {
    const updatedItems = canvasItems.filter(item => item.id !== id);
    setCanvasItems(updatedItems);
    updateJSON(updatedItems);
  };

  const handleUpdateItem = (id, updatedItem) => {
    const updatedItems = canvasItems.map(item => (item.id === id ? { ...item, ...updatedItem } : item));
    setCanvasItems(updatedItems);
    updateJSON(updatedItems);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...canvasItems];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setCanvasItems(updatedItems);
    updateJSON(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', bgcolor: 'grey.100', p: 1, gap: 1 }}>
        <ToolboxComponent />
        <TextComponent
          items={canvasItems}
          onDrop={handleDrop}
          onDelete={handleDeleteItem}
          onUpdate={handleUpdateItem}
          moveItem={moveItem}
        />
        <Box sx={{ width: '20%' }}>
          <Paper elevation={3} sx={{ p: 1, height: '85vh' }}>
            <RemotionPlayer jsonData={jsonData} />
          </Paper>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default MainLayout;
