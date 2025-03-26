import style from '@styles/admin/menu.module.scss';
import AdminMenuItem from './Item';

import uploadIcon from '@assets/icons/upload.svg';
import editIcon from '@assets/icons/ic-baseline-create.svg';
import categoryIcon from '@assets/icons/category-18.svg';

export default function AdminMenuList() {
    return <section className={style.list}>
        <AdminMenuItem page='upload' icon={uploadIcon} title='에셋 등록' desc='목록에 새롭게 에셋을 추가 합니다.' />
        <AdminMenuItem page='edit' icon={editIcon} title="에셋 수정" desc='정보를 검토하고 수정 및 업데이트 합니다.' />
        <AdminMenuItem page='category' icon={categoryIcon} title="카테고리 설정" desc='카테고리를 구성하고 관리합니다.' />
    </section>;
}