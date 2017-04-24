/// <reference path="CalculatorBase.ts"/>

namespace InnKppCalculator {
    export class CalculatorInnUl extends CalculatorBase {
        constructor(inputId: string)
        {
            super(inputId, 9);
        }

        calcInternal(inn: string): string
        {
            inn = inn.substr(0, 9);
            const i1 = parseInt(inn[0], 10);
            const i2 = parseInt(inn[1], 10);
            const i3 = parseInt(inn[2], 10);
            const i4 = parseInt(inn[3], 10);
            const i5 = parseInt(inn[4], 10);
            const i6 = parseInt(inn[5], 10);
            const i7 = parseInt(inn[6], 10);
            const i8 = parseInt(inn[7], 10);
            const i9 = parseInt(inn[8], 10);
            const c = (i1 * 2 + i2 * 4 + i3 * 10 + i4 * 3 + i5 * 5 + i6 * 9 + i7 * 4 + i8 * 6 + i9 * 8) % 11 % 10;
            return inn + c;
        }
    }
}