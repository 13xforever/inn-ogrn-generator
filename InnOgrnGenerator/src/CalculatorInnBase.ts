/// <reference path="CalculatorBase.ts"/>
'use strict';

module InnKppCalculator {
    export abstract class CalculatorInnBase extends CalculatorBase {
        constructor(inputId: string, threshold: number)
        {
            super(inputId, threshold);
        }

        protected calcChecksum(inn: number[], coeff: number[]): number
        {
            let csum = 0;
            for (let i = 0; i < coeff.length; i++)
                csum += inn[i] * coeff[i];
            return csum % 11 % 10;
        }

        protected parseNum(inn: string): number[]
        {
            let result: number[] = [];
            for (let i = 0; i < inn.length; i++)
                result.push(parseInt(inn[i], 10));
            return result;
        }
    }
}