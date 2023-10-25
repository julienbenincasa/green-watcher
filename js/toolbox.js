function formatBytes(bytes) {
    let result = {
        formattedValue: 0,
        unit: 'B'
    }
    if (bytes === 0) return result;

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const formattedValue = (bytes / Math.pow(k, i)).toFixed(2);

    result.formattedValue = formattedValue;
    result.unit = sizes[i];

    return result;
}

function formatGrams(grams) {
    let result = {
        formattedValue: 0,
        unit: 'g'
    }
    if (grams === 0) return '0g';

    const k = 1000;
    const units = ['g', 'kg', 't'];

    let i = 0;
    while (grams >= k && i < units.length - 1) {
        grams /= k;
        i++;
    }

    const formattedValue = (i === 0 ? grams : grams.toFixed(2));

    result.formattedValue = formattedValue;
    result.unit = units[i];

    return result;
}

export {
    formatBytes,
    formatGrams
}