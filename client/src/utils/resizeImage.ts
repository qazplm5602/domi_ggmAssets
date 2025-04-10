import Resizer from "react-image-file-resizer";

export function resizeImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG",
            100,
            0,
            (uri) => {
                if (uri instanceof File)
                    resolve(uri);
                else
                    reject("왜 file 타입이 아님???");

            },
            "file"
        );
    });
}