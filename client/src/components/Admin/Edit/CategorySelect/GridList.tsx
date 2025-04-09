import AdminEditCategorySelectItemGrid from "./Grid";

type Props = {
    depth: number,
    last: boolean,
    lalast: boolean,
}

export default function AdminEditCategorySelectItemGridList({ depth, last, lalast }: Props) {
    return Array.from(new Array(depth)).map((_, i) => {
        let mode: Parameters<typeof AdminEditCategorySelectItemGrid>['0']['mode'] = 'line';

        // 끝쪽임
        if (i === depth - 1) {
            mode = last ? 'end' : 'center';
        } else if (lalast) { // 끝쪽은 아닌데 아무튼 카테고리 내에서 맨 마지막에 있엉
            mode = 'space';
        }

        return <AdminEditCategorySelectItemGrid key={i} mode={mode} />;
    })
}