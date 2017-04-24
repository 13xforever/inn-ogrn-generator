/// <reference path="CalculatorBase.ts"/>

namespace InnKppCalculator {
    export class CalculatorInnFl extends CalculatorBase {
        constructor(inputId: string)
        {
            super(inputId, 10);
        }

        calcInternal(inn: string): string
        {
            inn = inn.substr(0, 10);
            const i1 = parseInt(inn[0], 10);
            const i2 = parseInt(inn[1], 10);
            const i3 = parseInt(inn[2], 10);
            const i4 = parseInt(inn[3], 10);
            const i5 = parseInt(inn[4], 10);
            const i6 = parseInt(inn[5], 10);
            const i7 = parseInt(inn[6], 10);
            const i8 = parseInt(inn[7], 10);
            const i9 = parseInt(inn[8], 10);
            const i0 = parseInt(inn[9], 10);
            const c1 = (i1 * 7 + i2 * 2 + i3 * 4 + i4 * 10 + i5 * 3 + i6 * 5 + i7 * 9 + i8 * 4 + i9 * 6 + i0 * 8) % 11 % 10;
            const c2 = (i1 * 3 + i2 * 7 + i3 * 2 + i4 * 4 + i5 * 10 + i6 * 3 + i7 * 5 + i8 * 9 + i9 * 4 + i0 * 6 + c1 * 8) % 11 % 10;
            return inn + c1 + c2;
        }
    }
}