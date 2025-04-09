import style from '@styles/admin/edit.module.scss';

type Props = {
    tags: string[]
}

export default function CategoryFieldTags({ tags }: Props) {
    return <section className={style.tags}>
        {tags.length > 1 && <p>{tags.slice(0, tags.length - 1).join(" / ")} /</p>}
        <span>{tags[tags.length - 1]}</span>
    </section>;
}