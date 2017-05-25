var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt:new Date().getTime()
    };
};

console.log(generateMessage("ass","hole"));

module.exports = generateMessage;
