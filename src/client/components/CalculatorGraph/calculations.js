export const calculations = function calculatePayments(
  initial,
  years,
  rate,
  monthlyOverpayment,
  overpayments = []
) {
  console.log("calculations");
  const monthlyRatePct = rate / 1200;
  const monthlyPaymentNumber =
    monthlyRatePct === 0
      ? initial / years / 12
      : (initial * monthlyRatePct) /
        (1 - Math.pow(1 / (1 + monthlyRatePct), years * 12));

  let balance = initial;
  let baseline = initial;
  let payments = [{ overpayment: 0, balance, baseline }];
  let partial;

  for (let year = 0; year < years; year++) {
    let interestYearly = 0;
    let overpaymentYearly = 0;
    for (let month = 1; month <= 12; month++) {
      const overpayment = overpayments
        .filter(x => +x.year === year && +x.month === month)
        .reduce((acc, val) => acc + +val.amount, 0);
      let interestMonth = balance * monthlyRatePct;
      interestYearly += interestMonth;
      overpaymentYearly += overpayment;
      balance -=
        monthlyPaymentNumber + monthlyOverpayment + overpayment - interestMonth;
      baseline -= monthlyPaymentNumber - baseline * monthlyRatePct;

      if (balance <= 0) {
        balance = 0;
        if (partial === undefined && month !== 12) {
          partial = month;
        }
      }
    }

    payments.push({
      baseline,
      interestYearly,
      balance,
      partial,
      overpayment: overpaymentYearly + +monthlyOverpayment * (partial || 12)
    });
    if (partial) partial = 0;
  }
  const numStr = monthlyPaymentNumber.toString().indexOf(".");
  const monthlyPaymentStr = monthlyPaymentNumber
    .toString()
    .slice(0, numStr + 2);
  const monthlyPayment = Number(monthlyPaymentStr);
  return { monthlyPayment, payments };
};
