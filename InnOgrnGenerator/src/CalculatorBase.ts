namespace InnKppCalculator {
    export abstract class CalculatorBase {
        protected readonly input: HTMLInputElement;
        protected readonly button: HTMLButtonElement;
        protected readonly threshold: number;
        protected readonly defaultLen: number;
        protected readonly maxlen: number;
        protected readonly force: boolean;
        protected readonly validFirstDigits: number[];

        constructor(inputId: string,
            threshold: number,
            force: boolean = false,
            validFirstDigits: number[] = [],
            randomGenLen: number | null = null,
            maxlen: number | null = null)
        {
            this.threshold = threshold;
            this.defaultLen = randomGenLen || threshold;
            this.force = force;
            this.validFirstDigits = validFirstDigits;
            this.input = document.getElementById(inputId) as HTMLInputElement;
            this.input.oninput = () => this.checkButtons();
            this.button = document.getElementById(inputId + "button") as HTMLInputElement;
            this.button.onclick = () => this.random();
            this.maxlen = maxlen || this.input.maxLength;
        }

        protected get value(): string { return this.input.value; }

        protected set value(value: string)
        {
            this.input.value = value;
            this.input.oninput();
        }

        protected set cssClass(name: string) { this.input.className = name; }

        protected get buttonText(): string { return this.button.value; }

        protected set buttonText(text: string) { this.button.value = text; }

        protected set buttonFunc(func: () => void) { this.button.onclick = func; }

        protected abstract calcInternal(existingValue: string): string;

        protected calc(existingValue: string): string
        {
            if (existingValue == null)
                return "";

            if (existingValue.length < 9)
                return existingValue;

            return this.calcInternal(existingValue);
        }

        random()
        {
            this.value = this.calc(this.getRandomNumber(this.value));
        }

        fix()
        {
            this.value = this.calc(this.value);
        }

        checkButtons()
        {
            let pureNum = this.getNumbersFromString(this.value) || "";
            if (pureNum.length < this.threshold)
            {
                this.cssClass = '';
                this.buttonText = 'Random';
                this.buttonFunc = () => this.random();
            } else
            {
                this.buttonFunc = () => this.fix();
                if (pureNum.length === this.maxlen || this.input.id === 'okpo')
                {
                    if (this.value === this.calc(this.value))
                    {
                        this.cssClass = 'glowGreen';
                        this.buttonText = 'Random';
                        this.buttonFunc = () => this.random();
                    } else
                    {
                        this.cssClass = 'glowRed';
                        this.buttonText = 'Fix';
                    }
                } else
                {
                    this.cssClass = '';
                    this.buttonText = 'Fix';
                }
            }
        }

        protected getNumbersFromString(stringNumber: string): string
        {
            if (stringNumber == null || stringNumber === "")
                return stringNumber;

            let result = "";
            for (var i = 0; i < stringNumber.length; i++)
                if (stringNumber[i] >= "0" && stringNumber[i] <= "9")
                    result += stringNumber[i];
            return result;
        }

        private getRandomNumber(existingPrefix: string): string
        {
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
}