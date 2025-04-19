import checkStyle from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';

type Props = {
    id: string,
    // onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function CheckBox({ id, ...props }: Props & React.InputHTMLAttributes<HTMLInputElement>) {
    return <>
        <input type="checkbox" id={id} className={checkStyle.check} {...props} />
        <label htmlFor={id} className={checkStyle.check_design}>
            <img src={checkIcon} draggable={false} alt='check' />
        </label>
    </>;
}