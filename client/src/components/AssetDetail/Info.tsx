import style from '@styles/assetDetail/style.module.scss';
import AssetDetailInfoText from './InfoText';
import AssetDetailInfoInteraction from './InfoInteraction';
import { AssetDetailVO } from '@domiTypes/asset';
import { motion } from 'framer-motion';
import { formatDateToKorean } from '@utils/misc';
import useLoginStore from '@components/LoginState/store';
import AssetDetailInfoLink from './InfoLink';
import { formatByteToUnit } from '@components/Admin/Edit/util/misc';

type Props = {
    data: AssetDetailVO
}

export default function AssetDetailInfo({ data }: Props) {
    const { admin } = useLoginStore();

    return <motion.div className={style.info} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'tween', duration: 0.3 }}>
        {data.fileSize && <AssetDetailInfoText title='파일 크기' value={formatByteToUnit(data.fileSize)} />}
        <AssetDetailInfoText title='등록된 날짜' value={data.publishAt ? formatDateToKorean(new Date(data.publishAt)) : '모름'} />
        {/* <AssetDetailInfoText title='지원' value='웹사이트 방문' /> */}
        {admin && <AssetDetailInfoLink title='관리자' text='수정하기' href={`/admin/edit/${data.id}`} />}

        <AssetDetailInfoInteraction download={data.downloadUrl} assetId={data.id} />
    </motion.div>
}