import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function ListItem({ id, text, checked, onCheckBoxChange }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`list-item ${isDragging ? 'dragging' : ''}`}
      {...attributes}
    >
      <label className="checkbox-group" style={{opacity: isDragging ? 0 : 1}}>
        <input 
          type="checkbox" 
          checked={checked}
          onChange={() => onCheckBoxChange(id)}
        />
        <span className="checkmark"></span>
        {text}
      </label>

      <span 
        className="material-symbols-outlined drag-handle"
        {...listeners}
      >
        drag_handle
      </span>
    </div>
  );
}

export default ListItem