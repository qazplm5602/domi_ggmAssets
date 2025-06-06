import checkStyle from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';

type Props = {
    id: string,
    color: string
}

export default function CheckBoxColor({ id, color, ...props }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
    return <>
        <input type="checkbox" id={id} className={checkStyle.check} {...props} />
        <label htmlFor={id} className={checkStyle.check_design} style={{ borderColor: color }}>
            <div className={checkStyle.checked_bg} style={{ backgroundColor: color }}></div>
            <img src={checkIcon} draggable={false} alt='check' />
        </label>
    </>;
}