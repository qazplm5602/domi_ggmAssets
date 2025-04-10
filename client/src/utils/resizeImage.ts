import Resizer from "react-image-file-resizer";

export function resizeImage(file: File) {
    return new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "file"
        );
    });
}