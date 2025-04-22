type Props = {
    title?: string,
}

export default function MetaTag({ title }: Props) {
    const showTitle = `${title}${title ? ' | ' : ''}GGM 에셋`;

    return <>
        <title>{showTitle}</title>
    </>;
}