import Dialog from "@components/Dialog/Dialog";
import PolicyPrivacyContent from "./PrivacyContent";
import { createPortal } from "react-dom";
import { useState } from "react";

import style from "@styles/policy/style.module.scss";
import { ResolvedValues } from "framer-motion";

type Props = {
    openTriggerRef?: React.RefObject<(() => void) | null>
}

export default function PolicyPrivacyLoginPopup({ openTriggerRef }: Props) {
    const [ show, setShow ] = useState(false);
    const [ showContent, setShowContent ] = useState(false);

    // sso url
    const loginURL = `${import.meta.env.VITE_OAUTH_GGM_URL}?redirect_uri=${encodeURIComponent(import.meta.env.VITE_OAUTH_GGM_REDIRECT_URL)}`;

    // 닫기
    const handleClose = function() {
        setShow(false);
    }

    // 애니메이션 진행 중 (80% 시점에 콘텐츠 표시)
    const handleAnimationUpdate = function(latest: ResolvedValues) {
        setShowContent(Number(latest.opacity) >= 0.8);
    }

    // 핸들러 등록
    if (openTriggerRef) {
        openTriggerRef.current = () => setShow(true);
    }

    return createPortal((
        <Dialog show={show} title="개인정보처리방침" className={style.popup} onClose={handleClose} onUpdate={handleAnimationUpdate}>
            <h3 className={style.desc}>로그인 하기 전 아래의 약관 내용을 확인해주세요.</h3>
            <pre className={style.content}>
                <PolicyPrivacyContent as="span" className={showContent ? '' : style.hide} />
            </pre>

            {/* 버튼 목록 */}
            <section className={style.interaction}>
                <a className={style.agree} href={loginURL}>이어서 하기</a>
                <button className={style.deny} onClick={handleClose}>안할래요</button>
            </section>
        </Dialog>
    ), document.body);
}