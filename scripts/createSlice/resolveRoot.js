const path = require('path');

// Выходим на верхний уровень проекта, чтобы в дальнейшем было удобно обращаться к папке src
module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);
