/// <reference path="CalculatorBase.ts"/>

namespace InnKppCalculator {
    export class CalculatorOgrnUl extends CalculatorBase {
        constructor(inputId: string)
        {
            super(inputId, 12, false, [1, 2, 5]);
        }

        calcInternal(ogrn: string): string
        {
            ogrn = ogrn.substr(0, 12);
            const op = parseInt(ogrn, 10);
            const c = (op % 11) % 10;
            return ogrn + c;
        }
    }
}