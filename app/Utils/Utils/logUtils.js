async function logWithHeader(message) {
    const header = '================================\n';
    const footer = '\n================================\n';

    return console.log(`${header}${message}${footer}`);
}

module.exports = logWithHeader;