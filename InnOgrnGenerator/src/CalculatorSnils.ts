/// <reference path="CalculatorBase.ts"/>
'use strict';

namespace InnKppCalculator {
    export class CalculatorSnils extends CalculatorBase {
        private readonly formatCheckbox: HTMLInputElement;

        constructor(inputId: string, formatCheckboxId: string)
        {
            super(inputId, 9, false, [], 10, 11);
            this.formatCheckbox = document.getElementById(formatCheckboxId) as HTMLInputElement;
            this.formatCheckbox.onchange = () => this.reformat();
        }

        protected calcInternal(snils: string): string
        {
            let originalSnils = snils;
            snils = this.getNumbersFromString(snils);
            if (snils.length < 9)
                return originalSnils;

            originalSnils = snils;
            snils = snils.substring(0, 9);
            if (parseInt(snils, 10) < 1001999)
                return this.format(`${originalSnils}00`);

            let c = 0;
            for (let i = 9; i > 0; i--)
                c += parseInt(snils[9 - i]) * i;
            if (c > 101)
                c = c % 101;
            if (c === 100 || c === 101)
                c = 0;
            return this.format(snils + (c < 10 ? `0${c}` : c));
        }

        private format(snilsNumber: string)
        {
            snilsNumber = this.getNumbersFromString(snilsNumber);
            if (snilsNumber.length < 11)
                return snilsNumber;

            if (!this.formatCheckbox.checked)
                return snilsNumber;

            const part1 = snilsNumber.substring(0, 3);
            const part2 = snilsNumber.substring(3, 6);
            const part3 = snilsNumber.substring(6, 9);
            const part4 = snilsNumber.substring(9, 11);
            return `${part1}-${part2}-${part3} ${part4}`;
        }

        private reformat()
        {
            this.value = this.format(this.value);
        }
    }
}