export const encode = (data) => {
    const encoded = Buffer.from(data.toString()).toString('base64');
    return encoded;
}