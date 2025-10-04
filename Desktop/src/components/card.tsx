interface CardProps {
    title?: string;
    children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
    return (
        <>
            <div style={{ backgroundColor: '#f4f4f4', padding: 20, borderRadius: 10}}>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </>
    )
}