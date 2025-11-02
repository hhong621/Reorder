import { useState } from 'react'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Section from './components/Section'
import './App.css'

function App() {
  const [data, setData] = useState([
    {
      id: "section-1",
      title: "Section 1",
      icon: "chess_bishop",
      items: [
        {id: "li-1", text: "List Item A", checked: false},
        {id: "li-2", text: "List Item B", checked: false},
        {id: "li-3", text: "List Item C", checked: false},
        {id: "li-4", text: "List Item D", checked: false}
      ]
    },
    {
      id: "section-2",
      title: "Section 2",
      icon: "chess_knight",
      items: [
        {id: "li-5", text: "List Item E", checked: false},
        {id: "li-6", text: "List Item F", checked: false},
        {id: "li-7", text: "List Item G", checked: false},
        {id: "li-8", text: "List Item H", checked: false}
      ]
    },
    {
      id: "section-3",
      title: "Section 3",
      icon: "chess_pawn",
      items: [
        {id: "li-9",  text: "List Item I", checked: false},
        {id: "li-10", text: "List Item J", checked: false},
        {id: "li-11", text: "List Item K", checked: false},
        {id: "li-12", text: "List Item L", checked: false}
      ]
    }
  ]);

  const handleCheckboxChange = (itemId) => {
    setData(prevData => {
      return prevData.map(section => ({
        ...section,
        items: section.items.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      }));
    });
  };

  const [activeId, setActiveId] = useState(null);

  const findItemSection = (itemId) => {
    for (const section of data) {
      const item = section.items.find(item => item.id === itemId);
      if (item) return section.id;
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeSection = findItemSection(active.id);
      const overSection = findItemSection(over.id);

      setData(prevData => {
        const newData = [...prevData];

        // Find the indices
        const activeSectionIndex = newData.findIndex(section => section.id === activeSection);
        const overSectionIndex = newData.findIndex(section => section.id === overSection);

        // Same section
        if (activeSection === overSection) {
          const items = [...newData[activeSectionIndex].items];
          const oldIndex = items.findIndex(item => item.id === active.id);
          const newIndex = items.findIndex(item => item.id === over.id);
          console.log('Reorder details:', {
            oldIndex,
            newIndex,
            items: items.map(i => i.text)
          });

          newData[activeSectionIndex].items = arrayMove(items, oldIndex, newIndex);
        } 
        // Different sections
        else {
          const sourceItems = [...newData[activeSectionIndex].items];
          const destItems = [...newData[overSectionIndex].items];

          const [movedItem] = sourceItems.splice(
            sourceItems.findIndex(item => item.id === active.id),
            1
          );

          const overIndex = destItems.findIndex(item => item.id === over.id);
          destItems.splice(overIndex, 0, movedItem);

          newData[activeSectionIndex].items = sourceItems;
          newData[overSectionIndex].items = destItems;
        }

        return newData;
      });
    }

    setActiveId(null);
  };

  const sections = (data) => {
    return (
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className='section-list'>
          {data.map(section => (
            <Section
              key={section.id}
              id={section.id}
              title={section.title}
              icon={section.icon}
              items={section.items}
              onCheckBoxChange={handleCheckboxChange}
            />
          ))}
        </div>
        <DragOverlay>
          {activeId ? (
            <div className="list-item dragging">
              <label className="checkbox-group">
                <input 
                  type="checkbox" 
                  checked={data
                    .flatMap(section => section.items)
                    .find(item => item.id === activeId)?.checked}
                  readOnly
                />
                <span className="checkmark"></span>
                {data
                  .flatMap(section => section.items)
                  .find(item => item.id === activeId)?.text}
              </label>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  };

  return (
    <>
      {sections(data)}
    </>
  );
}

export default App
