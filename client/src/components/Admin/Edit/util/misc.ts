const ONE_GB = 1024 * 1024 * 1024;

export function formatByteToUnit(bytes: number) {
    let divide = 1024 * 1024;
    let unit = "MB";
    
    if (bytes > ONE_GB) {
        divide = ONE_GB;
        unit = "GB";
    }
    
    return `${Math.round((bytes / divide) * 10) / 10} ${unit}`;
}