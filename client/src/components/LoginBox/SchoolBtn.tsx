import style from '@styles/login/style.module.scss';

import ggmLogo from '@assets/ggmLow.webp';

type Props = {
    onClick?: () => void
}

export default function LoginBoxSchoolBtn({ onClick }: Props) {
    return <button className={style.btn} onClick={onClick}>
        <img src={ggmLogo} alt="ggm logo" />
        <div>GGM 로그인</div>
    </button>
}