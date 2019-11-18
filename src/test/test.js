const chai = require("chai");
const fillInTheBlanks = require("./fn.js");
const expect = chai.expect;
// src / client / utils / fillInTheBlanks.js;
const answerKeys = ["payments", "principal", "payment", "interest"];

function checkUpdatedIsTrue(data) {
  return data.updated === true;
}

function noNegativeValues(data) {
  var testedArr = answerKeys.filter(a => {
    return data[a].indexOf("-") === -1;
  });
  return testedArr.length === 4;
}

describe("case 1", () => {
  it("returns no negative values and is updated", () => {
    // Case 1 = missing_interest_loanTerm_originalLoan
    var missing_interest_loanTerm_originalLoan = {
      firstPaymentDate: "2018-11-11",
      loanAmount: "350,000",
      monthlyPayment: "4,000"
    };
    var answer = fillInTheBlanks(missing_interest_loanTerm_originalLoan);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 2", () => {
  it("returns no negative values and is updated", () => {
    // Case 1 = missing_interest_loanTerm_originalLoan
    var missing_interest_monthlyPayment_originalLoan = {
      firstPaymentDate: "2018-11-11",
      loanAmount: "350,000",
      loanTerm: "30"
    };
    var answer = fillInTheBlanks(missing_interest_monthlyPayment_originalLoan);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 3", () => {
  it("returns no negative values and is updated", () => {
    var missing_interest_monthlyPayment_loanTerm = {
      firstPaymentDate: "2017-11-11",
      loanAmount: "350,000",
      originalLoanAmount: "400,000"
    };
    var answer = fillInTheBlanks(missing_interest_monthlyPayment_loanTerm);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 4", () => {
  it("returns no negative values and is updated", () => {
    var missing_original_monthlyPayment_loanTerm = {
      firstPaymentDate: "2019-08-11",
      interestRate: "5.75",
      loanAmount: "400,000"
    };
    var answer = fillInTheBlanks(missing_original_monthlyPayment_loanTerm);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 5", () => {
  it("returns no negative values and is updated", () => {
    var missing_original_interestRate_firstPaymentDate = {
      loanTerm: "30",
      monthlyPayment: "2,200",
      loanAmount: "400,000"
    };

    var answer = fillInTheBlanks(
      missing_original_interestRate_firstPaymentDate
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 6", () => {
  it("returns no negative values and is updated", () => {
    var missing_interestRate_firstPaymentDate_loanTerm = {
      originalLoanAmount: "400,000",
      monthlyPayment: "2,200",
      loanAmount: "350,000"
    };
    var answer = fillInTheBlanks(
      missing_interestRate_firstPaymentDate_loanTerm
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 7", () => {
  it("returns no negative values and is updated", () => {
    var missing_originalLoanAmount_firstPaymentDate_loanTerm = {
      interestRate: "5.75",
      monthlyPayment: "2,200",
      loanAmount: "350,000"
    };
    var answer = fillInTheBlanks(
      missing_originalLoanAmount_firstPaymentDate_loanTerm
    );

    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 8", () => {
  it("returns no negative values and is updated", () => {
    var missing_interestRate_firstPaymentDate_monthlyPayment = {
      loanTerm: 30,
      originalLoanAmount: "450,000",
      loanAmount: "350,000"
    };

    var answer = fillInTheBlanks(
      missing_interestRate_firstPaymentDate_monthlyPayment
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 9", () => {
  it("returns no negative values and is updated", () => {
    var missing_originalLoanAmount_firstPaymentDate_monthlyPayment = {
      loanTerm: 30,
      loanAmount: "550,000",
      interestRate: "5.75"
    };
    var answer = fillInTheBlanks(
      missing_originalLoanAmount_firstPaymentDate_monthlyPayment
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 10", () => {
  it("returns no negative values and is updated", () => {
    var missing_loanTerm_firstPaymentDate_monthlyPayment = {
      loanAmount: "400,00",
      originalLoanAmount: "550,000",
      interestRate: "5.75"
    };
    var answer = fillInTheBlanks(
      missing_loanTerm_firstPaymentDate_monthlyPayment
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 11", () => {
  it("returns no negative values and is updated", () => {
    var missing_interestRate_loanAmount_originalLoanAmount = {
      monthlyPayment: "2,400",
      firstPaymentDate: "2017-08-11",
      loanTerm: "30"
    };
    var answer = fillInTheBlanks(
      missing_interestRate_loanAmount_originalLoanAmount
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 12", () => {
  it("returns no negative values and is updated", () => {
    var missing_interestRate_loanAmount_loanTerm = {
      monthlyPayment: "4000",
      firstPaymentDate: "2017-08-11",
      originalLoanAmount: "450,000"
    };
    var answer = fillInTheBlanks(missing_interestRate_loanAmount_loanTerm);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 13", () => {
  it("returns no negative values and is updated", () => {
    var missing_originalLoanAmount_loanAmount_loanTerm = {
      monthlyPayment: "4000",
      firstPaymentDate: "2017-08-11",
      interestRate: "5.75"
    };
    var answer = fillInTheBlanks(
      missing_originalLoanAmount_loanAmount_loanTerm
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 14", () => {
  it("returns no negative values and is updated", () => {
    var missing_loanAmount_interestRate_monthly = {
      loanTerm: 30,
      firstPaymentDate: "2017-08-11",
      originalLoanAmount: "550,000"
    };
    var answer = fillInTheBlanks(missing_loanAmount_interestRate_monthly);
    console.log("aasdfadsfasdfasdnswer", answer);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 15", () => {
  it("returns no negative values and is updated", () => {
    var missing_loanAmount_originalLoanAmount_monthly = {
      loanTerm: 30,
      firstPaymentDate: "2017-08-11",
      interestRate: "5.55"
    };
    var answer = fillInTheBlanks(missing_loanAmount_originalLoanAmount_monthly);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 16", () => {
  it("returns no negative values and is updated", () => {
    var missing_loanAmount_monthly_loanTerm = {
      originalLoanAmount: "450,000",
      firstPaymentDate: "2017-08-11",
      interestRate: "5.55"
    };
    var answer = fillInTheBlanks(missing_loanAmount_monthly_loanTerm);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 17", () => {
  it("returns no negative values and is updated", () => {
    var missing_originalLoanAmount_firstPaymentDate_interestRate = {
      originalLoanAmount: "450,000",
      loanTerm: 30,
      monthlyPayment: "2200"
    };
    var answer = fillInTheBlanks(
      missing_originalLoanAmount_firstPaymentDate_interestRate
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 18", () => {
  it("returns no negative values and is updated", () => {
    var missing_originalLoanAmount_firstPaymentDate_loanAmount = {
      interestRate: "5.75",
      loanTerm: 30,
      monthlyPayment: "2200"
    };

    var answer = fillInTheBlanks(
      missing_originalLoanAmount_firstPaymentDate_loanAmount
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 19", () => {
  it("returns no negative values and is updated", () => {
    var missing_loanAmount_firstPaymentDate_loanTerm = {
      interestRate: "5.75",
      originalLoanAmount: "450,000",
      monthlyPayment: "2200"
    };
    var answer = fillInTheBlanks(missing_loanAmount_firstPaymentDate_loanTerm);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 20", () => {
  it("returns no negative values and is updated", () => {
    var missing_loanAmount_firstPaymentDate_monthly = {
      interestRate: "5.75",
      originalLoanAmount: "450,000",
      loanTerm: 30
    };

    var answer = fillInTheBlanks(missing_loanAmount_firstPaymentDate_monthly);
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});

describe("case 21", () => {
  it("returns no negative values and is updated", () => {
    var missing_originalLoanAmount_firstPaymentDate_loanTerm = {
      interestRate: "5.75",
      monthlyPayment: "2,200",
      loanAmount: "350,000"
    };
    var answer = fillInTheBlanks(
      missing_originalLoanAmount_firstPaymentDate_loanTerm
    );
    expect(checkUpdatedIsTrue(answer)).to.eql(true);
    expect(noNegativeValues(answer)).to.eql(true);
  });
});
