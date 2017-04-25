/// <reference path="CalculatorBase.ts"/>

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
            snils = snils.substr(0, 9);
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

        private format(snilsNumber)
        {
            snilsNumber = this.getNumbersFromString(snilsNumber);
            if (snilsNumber.length < 11)
                return snilsNumber;

            if (!this.formatCheckbox.checked)
                return snilsNumber;

            const part1 = snilsNumber.substr(0, 3);
            const part2 = snilsNumber.substr(3, 3);
            const part3 = snilsNumber.substr(6, 3);
            const part4 = snilsNumber.substr(9, 2);
            return `${part1}-${part2}-${part3} ${part4}`;
        }

        private reformat()
        {
            this.value = this.format(this.value);
        }
    }
}