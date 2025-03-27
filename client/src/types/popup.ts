export interface PopupButtonType {
    text: string,
    color?: string,
    callback: () => void
}

export interface PopupStoreType {
    show: boolean,
    title: string,
    content: React.ReactNode,
    interaction: PopupButtonType[],
    
    // 설정 함수 그거
    openPopup: (title: string, content: React.ReactNode, interactions: PopupButtonType[]) => void,
    closePopup: () => void,
    // clickButton: (idx: number) => void
}