export const UrlSplit = (url) => {
    let urlSplit = url.split("/");
    return urlSplit.splice(3);
};