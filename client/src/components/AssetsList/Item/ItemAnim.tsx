import { motion } from "framer-motion";
import AssetItem from "./Item";

const MAX_ANIM_AMOUNT = 100; // 100 까지만 애니메이션 적용함 (그 이후에는 어차피 안보여서 몰루)

type Props = {
    idx?: number
}

export default function AssetItemAnim({ idx, ...props }: Props & Parameters<typeof AssetItem>['0']) {
    return <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.01 * ((idx && idx < MAX_ANIM_AMOUNT) ? idx : 0) }}>
        <AssetItem {...props} />
    </motion.a>;
}