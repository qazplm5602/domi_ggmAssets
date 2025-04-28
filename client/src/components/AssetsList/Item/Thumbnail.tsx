import style from '@styles/assetsList/style.module.scss';
import AssetsListThumbnailArrowButton from './ArrowButton';
import { useEffect, useRef, useState } from 'react';
import { PageThumbnailVO, ThumbnailVO } from '@domiTypes/asset';
import { AnimatePresence, motion } from 'framer-motion';
import AssetsListItemThumbnailView from './ThumbnailView';
import { generateRandomString } from '@utils/misc';
import { request } from '@utils/request';
import AssetsListThumbnailPageAmount from './PageAmount';

type Props = {
    images: PageThumbnailVO,
    id: number
}
type ThumbnailDict = { [key: number]: ThumbnailVO }

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

export default function AssetsListItemThumbnail({ id: assetId, images }: Props) {
    const [ loadedImages, setLoadedImages ] = useState<ThumbnailDict>([]);
    const [ currentIdx, setCurrentIdx ] = useState(0);
    const [ back, setBack ] = useState(false);
    const firstRef = useRef<boolean>(true);
    const loadPageRef = useRef<Set<Number>>(new Set([0])); // 이미 0페이지는 불러온거잉
    const aliveRef = useRef<string | null>(null);

    // 더 필요한 사진 있는지 확인 ㄱㄱ
    const checkRequestLoad = async function() {
        const id = aliveRef.current;

        const maxPage = Math.ceil(images.size / PAGE_ONE_AMOUNT);
        const currentPage = Math.floor(currentIdx / PAGE_ONE_AMOUNT);
        const nextPage = currentPage + 1;
        
        const diff = PAGE_ONE_AMOUNT - (currentIdx % PAGE_ONE_AMOUNT); // 다음 페이지 까지 ㅊㅇ

        // 불러올 필요 없엉
        if (diff > 1 || nextPage > maxPage || loadPageRef.current.has(nextPage)) {
            return;
        }

        // 로딩 ㄱㄱ
        loadPageRef.current.add(nextPage);

        // 이미 있는지 확인즁
        const startIdx = nextPage * PAGE_ONE_AMOUNT;
        let allLoaded = true;
        for (let i = startIdx; i < Math.min(images.size, startIdx + PAGE_ONE_AMOUNT); i++) {
            const image = loadedImages[i];
            
            if (!image) {
                allLoaded = false;
                break;
            }
        }
        
        if (allLoaded)
            return; // 이미 다 불러와져 있넹

        const result = await request<PageThumbnailVO>(`asset/${assetId}/preview`, { params: { page: nextPage } });

        // 로드 도중에 바뀐듯
        if (aliveRef.current !== id) return;
        
        setLoadedImages(prev => {
            const copyData = { ...prev };
            result.data.images.forEach((v, i) => copyData[startIdx + i] = v);

            return copyData;
        });
    }
    
    const handlePrev = function(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();
        setBack(true);
        setCurrentIdx(currentIdx - 1);
    }

    const handleNext = function(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        e.preventDefault();
        setBack(false);
        setCurrentIdx(currentIdx + 1);
    }
    
    useEffect(() => {
        firstRef.current = false;
    }, []);

    // 다른 에셋으로 바뀜 (아마도)
    useEffect(() => {
        const ids: ThumbnailDict = {};
        images.images.forEach((v, i) => ids[i] = v);
        setLoadedImages(prev => ({ ...prev, ...ids }));
        
        loadPageRef.current = new Set([0]);
        setCurrentIdx(0);
        aliveRef.current = generateRandomString(4);

        return () => {
            aliveRef.current = null;
        }
    }, [ images ]);

    // 사진 불러올지 확인
    useEffect(() => {
        checkRequestLoad();
    }, [ currentIdx ]);
    
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
        <AssetsListThumbnailPageAmount />
    </section>
}