interface CardProps {
    title?: string;
    children: React.ReactNode;
}

export default function CardBranco({ title, children }: CardProps) {
    return (
        <>
            <div style={{ backgroundColor: '#fff', padding: 20, borderRadius: 10, flex: 1}}>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </>
    )
}