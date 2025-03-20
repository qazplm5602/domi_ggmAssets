import style from '@styles/assetsList/style.module.scss';
import AssetsListThumbnailArrowButton from './ArrowButton';
import { useEffect, useRef, useState } from 'react';
import { PageThumbnailVO, ThumbnailVO } from '@domiTypes/asset';
import { AnimatePresence, motion } from 'framer-motion';
import AssetsListItemThumbnailView from './ThumbnailView';

type Props = {
    images: PageThumbnailVO
}

const ANIM_VARIANTS = {
    enter: (back: boolean) => ({
        x: (100 * (back ? -1 : 1)) + '%'
    }),
    center: {
        x: 0
    },
    exit: (back: boolean) => ({
        position: "absolute",
        x: (100 * (back ? 1 : -1)) + '%'
    })
}
const ANIM_TRANSITION = {
    duration: 0.2
}
const PAGE_ONE_AMOUNT = 4; // 페이지 하나당 4개

export default function AssetsListItemThumbnail({ images }: Props) {
    const [ loadedImages, setLoadedImages ] = useState<ThumbnailVO[]>([]);
    const [ currentIdx, setCurrentIdx ] = useState(0);
    const [ back, setBack ] = useState(false);
    const firstRef = useRef<boolean>(true);
    const loadPageRef = useRef<Set<Number>>(new Set([0])); // 이미 0페이지는 불러온거잉
    
    const handlePrev = function(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault()
        setBack(true);
        setCurrentIdx(currentIdx - 1);
    }

    const handleNext = function(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault()
        setBack(false);
        setCurrentIdx(currentIdx + 1);
    }

    useEffect(() => {
        firstRef.current = false;
    }, []);

    // 다른 에셋으로 바뀜 (아마도)
    useEffect(() => {
        loadPageRef.current = new Set([0]);
        setLoadedImages([ ...images.images ]);
        setCurrentIdx(0);
    }, [ images ]);
    
    return <section className={style.gallery}>
        <AnimatePresence custom={back}>
            <motion.article
                className={style.list}
                key={currentIdx}
                custom={back}
                initial={firstRef.current ? false : "enter"}
                animate="center"
                exit="exit"
                transition={ANIM_TRANSITION}
                variants={ANIM_VARIANTS as any}
            >
                <AssetsListItemThumbnailView thumbnail={loadedImages[currentIdx]} />
            </motion.article>
        </AnimatePresence>

        <AssetsListThumbnailArrowButton onClick={handlePrev} disabled={currentIdx === 0} />
        <AssetsListThumbnailArrowButton onClick={handleNext} right={true} disabled={currentIdx >= images.size - 1} />
    </section>
}