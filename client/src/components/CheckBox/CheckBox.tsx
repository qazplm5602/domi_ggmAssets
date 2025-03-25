import checkStyle from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';

type Props = {
    id: string
}

export default function CheckBox({ id }: Props) {
    return <>
        <input type="checkbox" id={id} className={checkStyle.check} />
        <label htmlFor={id} className={checkStyle.check_design}>
            <img src={checkIcon} draggable={false} alt='check' />
        </label>
    </>;
}