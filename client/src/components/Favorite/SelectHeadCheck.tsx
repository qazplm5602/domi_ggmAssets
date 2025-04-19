import checkStyle from '@styles/assetsList/side.module.scss';
import checkIcon from '@assets/icons/check.svg';
import lineIcon from '@assets/icons/horizontal-line.svg';

type Props = {
    active: boolean,
    all: boolean,
    onChange?: (check: boolean) => void
}

export default function FavoriteSelectHeadCheck({ active, all, onChange }: Props) {
    const handleCheck = function(e: React.ChangeEvent<HTMLInputElement>) {
        if (onChange)
            onChange(e.target.checked);
    }

    return <>
        <input type="checkbox" id='domitest222' className={checkStyle.check} checked={active} onChange={handleCheck} />
        <label htmlFor="domitest222" className={checkStyle.check_design}>
            <img src={all ? checkIcon: lineIcon} draggable={false} alt='check' />
        </label>
    </>;
}