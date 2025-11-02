import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ListItem from './ListItem';

function Section({ id, title, icon, items, onCheckBoxChange }) {
  return (
    <div className="section">
      <div className="section-header">
        <span className="material-symbols-outlined" style={{color: "#2C83E6"}}>{icon}</span>
        <h2>{title}</h2>
      </div>
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className="section-content">
          {items.map(item => (
            <ListItem 
              key={item.id} 
              id={item.id}
              text={item.text}
              checked={item.checked}
              onCheckBoxChange={onCheckBoxChange}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default Section