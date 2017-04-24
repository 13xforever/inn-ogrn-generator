function GetNumbersFromString(stringNumber: string): string {
    if (stringNumber == null || stringNumber === "")
        return stringNumber;

    var result = "";
    for (var i = 0; i < stringNumber.length; i++)
        if (stringNumber[i] >= "0" && stringNumber[i] <= "9")
            result += stringNumber[i];
    return result;
}

function GetRandomNumber(existingPrefix: string, length: number, force: boolean, validFirstDigits: number[]): string {
    var result = GetNumbersFromString(existingPrefix);
    if (result.length > length || force)
        result = "";
    if (validFirstDigits != null && validFirstDigits.length > 0)
        result += validFirstDigits[Math.floor(Math.random() * validFirstDigits.length)];
    for (var i = result.length; i < length; i++)
        result += Math.floor(Math.random() * 10);
    return result;
}