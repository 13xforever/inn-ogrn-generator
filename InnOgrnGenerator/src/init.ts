/// <reference path="CalculatorBase.ts"/>
/// <reference path="CalculatorInnUl.ts"/>
/// <reference path="CalculatorInnFl.ts"/>
/// <reference path="CalculatorOgrnUl.ts"/>
/// <reference path="CalculatorOgrnFl.ts"/>
/// <reference path="CalculatorOkpo.ts"/>
/// <reference path="CalculatorSnils.ts"/>

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

declare class Clipboard {
    constructor(selector: string);
}

var calculators: any;
var clipboard: Clipboard;
var initialized = false;

function init(src: string)
{
    let diag = document.getElementById("load-diag") as HTMLDivElement;
    if (!initialized)
    {
        calculators = InnKppCalculator.init();
        clipboard = new Clipboard('input.cb-copy');
        initialized = true;
        diag.innerText = src;
        diag.style.display = "none";
    } else
    {
        diag.innerHTML += `<br/>${src}`;
    }
}

document.addEventListener("DOMContentLoaded", () => init("DOMContentLoaded"));
window.addEventListener("load", () => init("load"));
setTimeout(() => init("setTimeout"), 100); //eat shit, safari
