
const isClickInsideElement = (clickX: number, clickY: number, element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        clickX >= rect.left &&
        clickX <= rect.right &&
        clickY >= rect.top &&
        clickY <= rect.bottom
    );
};

export function hideOnClickOutside(selectorId: string, onHide: () => void): () => void {
    const handleClick = (event: MouseEvent) => {
        const el = document.getElementById(selectorId);
        const elButton = document.getElementById('target-button-' + selectorId);

        if (el && elButton) {
            console.log(elButton);

            const clickX = event.clientX;
            const clickY = event.clientY;
            if (!isClickInsideElement(clickX, clickY, elButton) && !isClickInsideElement(clickX, clickY, el)) {
                onHide();
            }
        }
    };

    document.addEventListener('click', handleClick);

    return () => {
        document.removeEventListener('click', handleClick);
    };
}
