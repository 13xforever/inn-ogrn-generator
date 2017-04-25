/// <reference path="CalculatorBase.ts"/>

namespace InnKppCalculator {
    export class CalculatorOkpo extends CalculatorBase {
        constructor(inputId: string)
        {
            super(inputId, 8, true, [], 13);
        }

        protected calcInternal(okpo: string): string
        {
            let c = 0;
            for (let i = 1; i < okpo.length; i++)
                c += parseInt(okpo[i - 1], 10) * ((i - 1) % 10 + 1);
            if (c % 11 === 10)
            {
                c = 0;
                for (let i = 1; i < okpo.length; i++)
                    c += parseInt(okpo[i - 1], 10) * ((i + 1) % 10 + 1);
            }
            c = (c % 11) % 10;
            return okpo.substr(0, okpo.length - 1) + c;
        }
    }
}