interface CardProps {
    title?: string;
    children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
    return (
        <>
            <div style={{ backgroundColor: '#F4F4F4', padding: 30, borderRadius: 10, flexWrap: 'wrap' }}>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </>
    )
}