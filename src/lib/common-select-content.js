const selectContent = $element => {
    /**
     * 通用的选中内容的方法
     * @param {object} [$element] （必传）$element 为原生 js 选择器返回的 dom 节点对象
     */

    if (window.getSelection) {
        const sel = window.getSelection();
        const range = document.createRange();
        
        sel.removeAllRanges();
        range.selectNodeContents($element);
        sel.addRange(range);
    } else if (document.selection) {
        const textRange = document.body.createTextRange();

        textRange.moveToElementText($element);
        textRange.select();
    }
};

export default selectContent;