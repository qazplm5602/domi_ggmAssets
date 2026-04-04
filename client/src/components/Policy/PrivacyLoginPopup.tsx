import Dialog from "@components/Dialog/Dialog";
import PolicyPrivacyContent from "./PrivacyContent";
import { createPortal } from "react-dom";
import { useState } from "react";

import style from "@styles/policy/style.module.scss";

type Props = {
    openTriggerRef?: React.RefObject<(() => void) | null>
}

export default function PolicyPrivacyLoginPopup({ openTriggerRef }: Props) {
    const [ show, setShow ] = useState(false);

    // 닫기
    const handleClose = function() {
        setShow(false);
    }

    // 핸들러 등록
    if (openTriggerRef) {
        openTriggerRef.current = () => setShow(true);
    }

    return createPortal((
        <Dialog show={show} title="개인정보처리방침" className={style.popup} onClose={handleClose}>
            <h3 className={style.desc}>로그인 하기 전 아래의 약관 내용을 확인해주세요.</h3>
            <PolicyPrivacyContent as="pre" className={style.content} />

            {/* 버튼 목록 */}
            <section className={style.interaction}>
                <button className={style.agree}>이어서 하기</button>
                <button className={style.deny} onClick={handleClose}>안할래요</button>
            </section>
        </Dialog>
    ), document.body);
}