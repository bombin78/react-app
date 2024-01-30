// Хелпер приводящий первую букву строки к верхнему регистру,
// и оставляющий все остальное неизменным. Например: article => Article
module.exports = (str) => str[0].toUpperCase() + str.slice(1);
