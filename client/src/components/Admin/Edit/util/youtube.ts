export function parseIdByYoutubeLink(link: string): string | null {
    const url = URL.parse(link);

    if (!url)
        return null;

    // if (url.host !== "youtube.com" && url.host !== "youtu.be")
        // return null;

    if (url.host === "www.youtube.com") {
        if (url.pathname === "/watch") {
            const id = url.searchParams.get("v");
            if (id)
                return id;            
        }
    } else if (url.host === "youtu.be") {
        const id = url.pathname.substring(1);
        if (id)
            return id;
    }

    return null;
}