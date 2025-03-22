import { CategoryVO } from '@domiTypes/category';
import style from '@styles/assetDetail/style.module.scss';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
    title: string,
    category: CategoryVO[] | null
}

export default function AssetDetailHead({ title, category }: Props) {
    return <motion.article className={style.head} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'tween', duration: 0.3 }}>
        <h1>{title}</h1>
        
        <section className={style.category}>
            {!category && <Link to="/assets?category=-1">분류되지 않음</Link>}
            {category && category.map((v, i) => <React.Fragment key={v.id}>
                {i !== 0 && <div className={style.line}></div>}
                <Link to={`/assets?category=${v.id}`}>{v.name}</Link>
            </React.Fragment>)}
        </section>
    </motion.article>;
}