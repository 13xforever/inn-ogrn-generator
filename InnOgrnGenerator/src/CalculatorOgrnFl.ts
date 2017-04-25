/// <reference path="CalculatorBase.ts"/>

namespace InnKppCalculator {
    export class CalculatorOgrnFl extends CalculatorBase {
        constructor(inputId: string)
        {
            super(inputId, 14, false, [3, 4]);
        }

        protected calcInternal(ogrn: string): string
        {
            ogrn = ogrn.substr(0, 14);
            const op = parseInt(ogrn, 10);
            const c = op % 13 % 10;
            return ogrn + c;
        }
    }
}