export default function ListItem(props) {
    const { id, text } = props;

    return (
        <div draggable="true" className="list-item">
            <label className="checkbox-group">
                {text}
                <input type="checkbox"/>
                <span className="checkmark"></span>
            </label>
            
            <span className="material-symbols-outlined drag-handle">
                drag_handle
            </span>
        </div>
    )
}