// Хелпер приводящий первую букву строки к нижнему регистру,
// и оставляющий все остальное неизменным. Например: Article => article
module.exports = (str) => str[0].toLowerCase() + str.slice(1);
