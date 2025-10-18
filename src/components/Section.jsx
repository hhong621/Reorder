export default function Section(props) {
    const { id, title, icon, items } = props;

    return (
        <div className="section">
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    padding: "12px 12px 12px 14px"
                }}
            >
                <span className="material-symbols-outlined" style={{color: "#2C83E6"}}>{icon}</span>
                <span style={{fontWeight: "700"}}>{title}</span>
            </div>
            <div>
                {items}
            </div>
        </div>
    )
}