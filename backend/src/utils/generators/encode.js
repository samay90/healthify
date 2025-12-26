export const encode = (data) => {
    const encoded = Buffer.from(data.toString()).toString('base64');
    return encoded;
}
export const decode = (data) => {
    const decoded = Buffer.from(data, 'base64').toString('ascii');
    return decoded;
}