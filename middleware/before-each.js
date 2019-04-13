export default function (context) {
    if (process.client &&
        context.from.path.includes("board/write") &&
        context.route.name !== "board-articleId") {
        if (!confirm("페이지를 떠나시겠습니까?")) {
            context.next(false)
        }
    }
}