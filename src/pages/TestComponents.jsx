import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
// import data from '../../../backend/public/collection/1.json'

// DND-KIT
import {
  DndContext,
  closestCenter,
  DragOverlay
} from "@dnd-kit/core"

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"  

// Custom Components
import SortableObject from '../components/DND/SortableObject';
import Topbar from '../components/Topbar/Topbar';

function TestComponents() {
  const [ele, setEle] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [elementsData, setElementsData] = useState();
  const [elementType, setElementType] = useState('')

  const elementId = 1;

  // Retrieve contents from /api/elements
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch(`/api/elements/${elementId}`);
        if (response.ok) {
          const data = await response.json();
          setEle(data);
          setElementsData(data); // Set initial data
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [elementId]);

  console.log(ele);

  const [isEditing, setEditing] = useState(false)

  // const toggleEditing = () => {
  //   setEditing(!isEditing);
  // };

  // const handleElementTypeChange = (event) => {
  //   setElementType(event.target.value);
  // };

  // const addNewElement = () => {
  //   const newElement = {
  //     id: elementsData.length + 1,
  //     type: elementType,
  //   }
  //   setElementType((prevData) => [...prevData, newElement])
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === '/' && !isEditing) {
  //     console.log(addNewElement());
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [addNewElement, isEditing]);
 
  const saveFn = async () => {
    try {
      if (!elementsData) {
        alert('No elements data to save');
        return;
      }

      const response = await fetch(`/api/elements/save-elements/${elementId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newFile: elementsData }),
      });
  
      if (response.ok) {
        alert('Elements saved successfully');
      } else {
        alert('Failed to save elements');
      }
    } catch (error) {
      alert('Error saving elements:', error);
    }
  };

  // const AddElementComp = () => {
  //   return (
  //     <>
  //       <select value={elementType} onChange={handleElementTypeChange}>
  //         <option value="">Select Element Type</option>
  //         <option value="heading1">Heading 1</option>
  //         <option value="heading2">Heading 2</option>
  //         <option value="heading3">Heading 3</option>
  //         <option value="paragraph">Paragraph</option>
  //         <option value="image">Image</option>
  //         <option value="ytEmbed">Youtube Embed</option>
  //       </select>
  //       <button onClick={addNewElement}>Add Element</button>
  //     </>
  //   );
  // }

  
  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (event.key === '/') {
  //       console.log(addNewElement());
  //     }
  //   };

  //   window.addEventListener('keydown', handleKeyDown);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [addNewElement]);

  return (
    <>
      <Topbar />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            <header>
              <button className='btn-orange' onClick={saveFn}>
                Save Elements
              </button>
              {/* {AddElementComp()} */}
            </header>
            <main>
              {isEditing ? (
                <div>
                  {/* Your editing-related components */}
                  {AddElementComp()}
                </div>
              ) : (
                <div className="dnd-container">
                <DndContext
                  onDragStart={handleDragStart}
                  collisionDetection={closestCenter}
                  onDragOver={handleDragOver}
                >
                  <SortableContext
                    items={elementsData.map((element) => element.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {elementsData.map((element) => (
                      <SortableObject
                        key={element.id}
                        id={element.id}
                        elements={element}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
                </div>
              )}
            </main>
          </Fragment>
        )}
      </div>
    </>
  );

  function handleDragStart() {
    setIsDragging(true);
    console.log(isDragging);
  }

  function handleDragOver(event) {
    console.log("Drag end called");
    const {active, over} = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER: " + over.id);
    setIsDragging(false);
    
    console.log(isDragging);
  
    if (active.id !== over.id) {
      setElementsData((items) => {
        const activeIndex = items.findIndex(item => item.id === active.id);
        const overIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex)
      });
    }
  }
}

export default TestComponents;