type Props<T extends React.ElementType> = {
    as?: T
} & React.ComponentPropsWithoutRef<T>;

export default function PolicyPrivacyContent<T extends React.ElementType = 'div'>({ as, ...props }: Props<T>) {
    const Tag = as || 'div';

    return <Tag {...props}>
{`내용.`}
    </Tag>;
}