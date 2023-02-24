'use strict';
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorBase {
        constructor(inputId, threshold, force = false, validFirstDigits = [], randomGenLen = null, maxlen = null) {
            this.threshold = threshold;
            this.defaultLen = randomGenLen || threshold;
            this.force = force;
            this.validFirstDigits = validFirstDigits;
            this.input = document.getElementById(inputId);
            this.input.oninput = () => this.checkButtons();
            this.button = document.getElementById(inputId + "button");
            this.button.onclick = () => this.random();
            this.maxlen = maxlen || this.input.maxLength;
        }
        get value() { return this.input.value; }
        set value(value) {
            this.input.value = value;
            this.input.oninput();
        }
        set cssClass(name) { this.input.className = name; }
        get buttonText() { return this.button.value; }
        set buttonText(text) { this.button.value = text; }
        set buttonFunc(func) { this.button.onclick = func; }
        calc(existingValue) {
            if (existingValue == null)
                return '';
            if (existingValue.length < 9)
                return existingValue;
            return this.calcInternal(existingValue);
        }
        random() {
            this.value = this.calc(this.getRandomNumber(this.value));
        }
        fix() {
            this.value = this.calc(this.value);
        }
        checkButtons() {
            let pureNum = this.getNumbersFromString(this.value) || '';
            if (pureNum.length < this.threshold) {
                this.cssClass = '';
                this.buttonText = 'Random';
                this.buttonFunc = () => this.random();
            }
            else {
                this.buttonFunc = () => this.fix();
                if (pureNum.length === this.maxlen || this.input.id === 'okpo') {
                    if (this.value === this.calc(this.value)) {
                        this.cssClass = 'glowGreen';
                        this.buttonText = 'Random';
                        this.buttonFunc = () => this.random();
                    }
                    else {
                        this.cssClass = 'glowRed';
                        this.buttonText = 'Fix';
                    }
                }
                else {
                    this.cssClass = '';
                    this.buttonText = 'Fix';
                }
            }
        }
        getNumbersFromString(stringNumber) {
            if (stringNumber == null || stringNumber === "")
                return stringNumber;
            let result = "";
            for (var i = 0; i < stringNumber.length; i++)
                if (stringNumber[i] >= "0" && stringNumber[i] <= "9")
                    result += stringNumber[i];
            return result;
        }
        getRandomNumber(existingPrefix) {
            let result = this.getNumbersFromString(existingPrefix);
            if (result.length > this.defaultLen || this.force)
                result = "";
            if (this.validFirstDigits.length > 0)
                result += this.validFirstDigits[Math.floor(Math.random() * this.validFirstDigits.length)];
            for (let i = result.length; i < this.defaultLen; i++)
                result += Math.floor(Math.random() * 10);
            return result;
        }
    }
    InnKppCalculator.CalculatorBase = CalculatorBase;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorInnBase extends InnKppCalculator.CalculatorBase {
        constructor(inputId, threshold) {
            super(inputId, threshold);
        }
        calcChecksum(inn, coeff) {
            let csum = 0;
            for (let i = 0; i < coeff.length; i++)
                csum += inn[i] * coeff[i];
            return csum % 11 % 10;
        }
        parseNum(inn) {
            let result = [];
            for (let i = 0; i < inn.length; i++)
                result.push(parseInt(inn[i], 10));
            return result;
        }
    }
    InnKppCalculator.CalculatorInnBase = CalculatorInnBase;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorInnFl extends InnKppCalculator.CalculatorInnBase {
        constructor(inputId) {
            super(inputId, 10);
            this.coeff1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
            this.coeff2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
        }
        calcInternal(inn) {
            inn = inn.substring(0, 10);
            const parsedInn = this.parseNum(inn);
            const c1 = this.calcChecksum(parsedInn, this.coeff1);
            parsedInn.push(c1);
            const c2 = this.calcChecksum(parsedInn, this.coeff2);
            return inn + c1 + c2;
        }
    }
    InnKppCalculator.CalculatorInnFl = CalculatorInnFl;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorInnUl extends InnKppCalculator.CalculatorInnBase {
        constructor(inputId) {
            super(inputId, 9);
            this.coeff = [2, 4, 10, 3, 5, 9, 4, 6, 8];
        }
        calcInternal(inn) {
            inn = inn.substring(0, 9);
            const parsedInn = this.parseNum(inn);
            const c = this.calcChecksum(parsedInn, this.coeff);
            return inn + c;
        }
    }
    InnKppCalculator.CalculatorInnUl = CalculatorInnUl;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorOgrnFl extends InnKppCalculator.CalculatorBase {
        constructor(inputId) {
            super(inputId, 14, false, [3, 4]);
        }
        calcInternal(ogrn) {
            ogrn = ogrn.substring(0, 14);
            const op = parseInt(ogrn, 10);
            const c = op % 13 % 10;
            return ogrn + c;
        }
    }
    InnKppCalculator.CalculatorOgrnFl = CalculatorOgrnFl;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorOgrnUl extends InnKppCalculator.CalculatorBase {
        constructor(inputId) {
            super(inputId, 12, false, [1, 2, 5]);
        }
        calcInternal(ogrn) {
            ogrn = ogrn.substring(0, 12);
            const op = parseInt(ogrn, 10);
            const c = (op % 11) % 10;
            return ogrn + c;
        }
    }
    InnKppCalculator.CalculatorOgrnUl = CalculatorOgrnUl;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorOkpo extends InnKppCalculator.CalculatorBase {
        constructor(inputId) {
            super(inputId, 8, true, [], 13);
        }
        calcInternal(okpo) {
            let c = 0;
            for (let i = 1; i < okpo.length; i++)
                c += parseInt(okpo[i - 1], 10) * ((i - 1) % 10 + 1);
            if (c % 11 === 10) {
                c = 0;
                for (let i = 1; i < okpo.length; i++)
                    c += parseInt(okpo[i - 1], 10) * ((i + 1) % 10 + 1);
            }
            c = (c % 11) % 10;
            return okpo.substring(0, okpo.length - 1) + c;
        }
    }
    InnKppCalculator.CalculatorOkpo = CalculatorOkpo;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    class CalculatorSnils extends InnKppCalculator.CalculatorBase {
        constructor(inputId, formatCheckboxId) {
            super(inputId, 9, false, [], 10, 11);
            this.formatCheckbox = document.getElementById(formatCheckboxId);
            this.formatCheckbox.onchange = () => this.reformat();
        }
        calcInternal(snils) {
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
        format(snilsNumber) {
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
        reformat() {
            this.value = this.format(this.value);
        }
    }
    InnKppCalculator.CalculatorSnils = CalculatorSnils;
})(InnKppCalculator || (InnKppCalculator = {}));
var InnKppCalculator;
(function (InnKppCalculator) {
    function init() {
        return [
            new InnKppCalculator.CalculatorInnUl("innul"),
            new InnKppCalculator.CalculatorInnFl("innfl"),
            new InnKppCalculator.CalculatorOgrnUl("ogrnul"),
            new InnKppCalculator.CalculatorOgrnFl("ogrnfl"),
            new InnKppCalculator.CalculatorOkpo("okpo"),
            new InnKppCalculator.CalculatorSnils("snils", "format_snils")
        ];
    }
    InnKppCalculator.init = init;
})(InnKppCalculator || (InnKppCalculator = {}));
var calculators;
var clipboard;
var initialized = false;
function init() {
    if (!initialized) {
        calculators = InnKppCalculator.init();
        clipboard = new ClipboardJS('input.cb-copy');
        initialized = true;
    }
}
document.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", init);
