/// <reference path="CalculatorBase.ts"/>
/// <reference path="CalculatorInnUl.ts"/>
/// <reference path="CalculatorInnFl.ts"/>
/// <reference path="CalculatorOgrnUl.ts"/>
/// <reference path="CalculatorOgrnFl.ts"/>
/// <reference path="CalculatorOkpo.ts"/>
/// <reference path="CalculatorSnils.ts"/>
'use strict';

namespace InnKppCalculator {
    export function init(): CalculatorBase[]
    {
        return [
            new CalculatorInnUl("innul"),
            new CalculatorInnFl("innfl"),
            new CalculatorOgrnUl("ogrnul"),
            new CalculatorOgrnFl("ogrnfl"),
            new CalculatorOkpo("okpo"),
            new CalculatorSnils("snils", "format_snils")
        ] as CalculatorBase[];
    }
}

declare class ClipboardJS {
    constructor(selector: string);
}

var calculators: any;
var clipboard: ClipboardJS;
var initialized = false;

function init()
{
    if (!initialized)
    {
        calculators = InnKppCalculator.init();
        clipboard = new ClipboardJS('input.cb-copy');
        initialized = true;
    }
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("load", init);
