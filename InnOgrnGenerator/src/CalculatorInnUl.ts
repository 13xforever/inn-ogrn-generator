/// <reference path="CalculatorInnBase.ts"/>
'use strict';

namespace InnKppCalculator {
    export class CalculatorInnUl extends CalculatorInnBase {
        private coeff = [2, 4, 10, 3, 5, 9, 4, 6, 8];

        constructor(inputId: string)
        {
            super(inputId, 9);
        }

        protected calcInternal(inn: string): string
        {
            inn = inn.substring(0, 9);
            const parsedInn = this.parseNum(inn);
            const c = this.calcChecksum(parsedInn, this.coeff);
            return inn + c;
        }
    }
}