/// <reference path="CalculatorInnBase.ts"/>

namespace InnKppCalculator {
    export class CalculatorInnFl extends CalculatorInnBase {
        private coeff1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        private coeff2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];

        constructor(inputId: string)
        {
            super(inputId, 10);
        }

        protected calcInternal(inn: string): string
        {
            inn = inn.substr(0, 10);
            const parsedInn = this.parseNum(inn);
            const c1 = this.calcChecksum(parsedInn, this.coeff1);
            parsedInn.push(c1);
            const c2 = this.calcChecksum(parsedInn, this.coeff2);
            return inn + c1 + c2;
        }
    }
}