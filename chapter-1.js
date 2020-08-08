function statement(invoice, plays) {
  let totalAmout = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`Unknown type: ${play.type}`);
    }

    // soma créditos por volume
    volumeCredits += Math.max(perf.audience - 30, 0);
    // soma um crédito extra para cada dez espectadores de comédia
    if ("comedy" == play.type) volumeCredits += Math.floor(perf.audience / 5);

    // exibe a linha para esta requisição
    result += `  ${play.name}: ${format(totalAmout / 100)} (${
      perf.audience
    } seats)\n`;
    thisAmount += thisAmount;
  }

  result += `Amount owned is ${format(totalAmout / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}
