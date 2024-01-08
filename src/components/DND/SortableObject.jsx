import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed'
import { DragIndicator } from '@mui/icons-material';

const SortableObject = (props) => {
    const { elements } = props;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id })

    // const [isEditing, setEditing] = useState(false);
    // const [editedContent, setEditedContent] = useState(elements.content);

    // const toggleEditing = () => {
    //     setEditing(!isEditing);
    // };

    // const handleDoubleClick = () => {
    //     toggleEditing();
    // };

    // const handleContentChange = (event) => {
    //     setEditedContent(event.target.value);
    // };

    // Define a fixed size for the element while dragging
    const fixedSizeStyle = {
        width: '100%', // Set the width to your desired value
        height: 'auto', // Set the height to your desired value
    };

    const style = {
        ...fixedSizeStyle,
        transform: CSS.Translate.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`draggable_style`}
        >
        <DragIndicator 
            {...attributes}
            {...listeners}
        />
        {elements.type === 'YoutubeEmbed' ? (
            <YoutubeEmbed videoLink={elements.attributes} />
        ) : (
            <div dangerouslySetInnerHTML={{ __html: `<${elements.type} ${elements.attributes}>${elements.content}</${elements.type}>` }} />
        )}
    </div>
    );
}

export default SortableObject;
