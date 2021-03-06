var messageMiddleware = {};

messageMiddleware.generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt:new Date().getTime()
    };
};

messageMiddleware.generateLocationMessage = (from, latitude, longitude) => {
    console.log(latitude);
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt:new Date().getTime()
    };
};

module.exports = messageMiddleware;
