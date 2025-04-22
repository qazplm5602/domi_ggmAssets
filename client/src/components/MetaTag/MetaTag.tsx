type Props = {
    title?: string,
}

export default function MetaTag({ title }: Props) {
    const showTitle = `${title}${title ? ' | ' : ''}GGM에셋`;

    return <>
        <title>{showTitle}</title>
    </>;
}