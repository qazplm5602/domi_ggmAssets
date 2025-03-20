import style from '@styles/assetsList/style.module.scss';
import AssetsListThumbnailArrowButton from './ArrowButton';
import { useEffect, useRef, useState } from 'react';
import { PageThumbnailVO } from '@domiTypes/asset';
import { AnimatePresence, motion } from 'framer-motion';
import { getThumbnailURL } from '@utils/file';

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
        x: (100 * (back ? 1 : -1)) + '%'
    })
}
const ANIM_TRANSITION = {
    duration: 0.2
}

export default function AssetsListItemThumbnail({ images }: Props) {
    const [ imagePage, setImagePage ] = useState<PageThumbnailVO>(images);
    const [ currentIdx, setCurrentIdx ] = useState(0);
    const [ back, setBack ] = useState(false);
    const firstRef = useRef<boolean>(true);
    
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

    const currentData = imagePage.images[currentIdx];

    let currentImageURL = "";
    if (currentData !== undefined) {
        currentImageURL = getThumbnailURL(currentData.previewUrl);
    }
    
    return <section className={style.gallery}>
        <article className={style.list}>
            <AnimatePresence custom={back}>
                <motion.img
                    alt="thumbnail 1"
                    key={currentIdx}
                    src={currentImageURL}
                    custom={back}
                    initial={firstRef.current ? false : "enter"}
                    animate="center"
                    exit="exit"
                    transition={ANIM_TRANSITION}
                    variants={ANIM_VARIANTS}
                />
            </AnimatePresence>
        </article>

        <AssetsListThumbnailArrowButton onClick={handlePrev} />
        <AssetsListThumbnailArrowButton onClick={handleNext} right={true} />
    </section>
}