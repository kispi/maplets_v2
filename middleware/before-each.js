const unsavedChangesWhenWriteArticle = (context) => {
    if (!process.client) return
    if (!context.from.path.includes("board/write")) return
    if (context.route.name === "board-articleId") return
    if (!document.getElementsByName("title")[0].value &&
        !document.getElementsByTagName("textarea")[0].value) return

    return !confirm("페이지를 떠나시겠습니까? 게시글을 저장하지 않고 나가시면 변경사항은 저장되지 않습니다.")
}

export default function (context) {
    if (unsavedChangesWhenWriteArticle(context)) {
        context.redirect(context.from.path)
    }
}