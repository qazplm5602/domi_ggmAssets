import style from '@styles/assetDetail/more.module.scss';

type Props = {
    text: string,
    icon: string,
    className?: string
}

export default function AssetDetailMoreCompatibilityIconText({ icon, className, text }: Props) {
    return <div className={style.check}>
        <div className={`${style.icon} ${className || ''}`}>
            <img src={icon} alt="checkbox" />
        </div>

        <p>{text}</p>
    </div>;
}