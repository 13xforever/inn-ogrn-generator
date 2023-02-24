/// <reference path="CalculatorBase.ts"/>
'use strict';

namespace InnKppCalculator {
    export class CalculatorOgrnUl extends CalculatorBase {
        constructor(inputId: string)
        {
            super(inputId, 12, false, [1, 2, 5]);
        }

        protected calcInternal(ogrn: string): string
        {
            ogrn = ogrn.substring(0, 12);
            const op = parseInt(ogrn, 10);
            const c = (op % 11) % 10;
            return ogrn + c;
        }
    }
}