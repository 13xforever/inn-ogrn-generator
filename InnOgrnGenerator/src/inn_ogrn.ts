function CalcInnUl(inn)
{
	if (inn == null) return "";
	if (inn.length < 9) return inn;
	inn = inn.substr(0, 9);
	var i1 = parseInt(inn[0], 10);
	var i2 = parseInt(inn[1], 10);
	var i3 = parseInt(inn[2], 10);
	var i4 = parseInt(inn[3], 10);
	var i5 = parseInt(inn[4], 10);
	var i6 = parseInt(inn[5], 10);
	var i7 = parseInt(inn[6], 10);
	var i8 = parseInt(inn[7], 10);
	var i9 = parseInt(inn[8], 10);
	var c = (i1 * 2 + i2 * 4 + i3 * 10 + i4 * 3 + i5 * 5 + i6 * 9 + i7 * 4 + i8 * 6 + i9 * 8) % 11 % 10;
	return inn + c;
}
function CalcInnFl(inn)
{
	if (inn == null) return "";
	if (inn.length < 10) return inn;
	inn = inn.substr(0, 10);
	var i1 = parseInt(inn[0], 10);
	var i2 = parseInt(inn[1], 10);
	var i3 = parseInt(inn[2], 10);
	var i4 = parseInt(inn[3], 10);
	var i5 = parseInt(inn[4], 10);
	var i6 = parseInt(inn[5], 10);
	var i7 = parseInt(inn[6], 10);
	var i8 = parseInt(inn[7], 10);
	var i9 = parseInt(inn[8], 10);
	var i0 = parseInt(inn[9], 10);
	var c1 = (i1 * 7 + i2 * 2 + i3 * 4 + i4 * 10 + i5 * 3 + i6 * 5 + i7 * 9 + i8 * 4 + i9 * 6 + i0 * 8) % 11 % 10;
	var c2 = (i1 * 3 + i2 * 7 + i3 * 2 + i4 * 4 + i5 * 10 + i6 * 3 + i7 * 5 + i8 * 9 + i9 * 4 + i0 * 6 + c1 * 8) % 11 % 10;
	return inn + c1 + c2;
}
function CalcOgrnUl(ogrn)
{
	if (ogrn == null) return "";
	if (ogrn.length < 12) return ogrn;
	ogrn = ogrn.substr(0, 12);
	var op = parseInt(ogrn, 10);
	var c = (op % 11) % 10;
	return ogrn + c;
}
function CalcOgrnFl(ogrn)
{
	if (ogrn == null) return "";
	if (ogrn.length < 14) return ogrn;
	ogrn = ogrn.substr(0, 14);
	var op = parseInt(ogrn, 10);
	var c = op % 13 % 10;
	return ogrn + c;
}
function CalcOkpo(okpo)
{
	if (okpo == null) return "";
	if (okpo.length < 8) return okpo;
	var c = 0;
	for (var i = 1; i < okpo.length; i++)
		c += parseInt(okpo[i - 1], 10) * ((i - 1) % 10 + 1);
	if (c % 11 == 10)
	{
		c = 0;
		for (var i = 1; i < okpo.length; i++)
			c += parseInt(okpo[i - 1], 10) * ((i + 1) % 10 + 1);
	}
	c = (c % 11) % 10;
	return okpo.substr(0, okpo.length - 1) + c;
}
function FormatSnils(snilsNumber)
{
	snilsNumber = GetNumbersFromString(snilsNumber);
	if (snilsNumber.length < 11)
		return snilsNumber;
	if (!document.getElementById('format_snils').checked)
		return snilsNumber;
	return snilsNumber.substr(0, 3) + "-" + snilsNumber.substr(3, 3) + "-" + snilsNumber.substr(6, 3) + " " + snilsNumber.substr(9, 2);
}
function ReformatSnils()
{
	snils.value = FormatSnils(snils.value);
}
function CalcSnils(snils)
{
	if (snils == null) return "";
	var originalSnils = snils;
	snils = GetNumbersFromString(snils);
	if (snils.length < 9) return originalSnils;
	originalSnils = snils;
	snils = snils.substr(0, 9);
	if (parseInt(snils, 10) < 1001999)
		return FormatSnils(originalSnils + "00");
	var c = 0;
	for (var i = 9; i > 0; i--)
		c += parseInt(snils[9 - i] * i);
	if (c > 101)
		c = c % 101;
	if (c == 100 || c == 101)
		c = 0;
	return FormatSnils(snils + (c < 10 ? "0" + c : c));
}
function FixInnUl()
{
	innul.value = CalcInnUl(innul.value);
	innul.oninput();
}
function RandomInnUl()
{
	innul.value = CalcInnUl(GetRandomNumber(innul.value, 9));
	innul.oninput();
}
function FixInnFl()
{
	innfl.value = CalcInnFl(innfl.value);
	innfl.oninput();
}
function RandomInnFl()
{
	innfl.value = CalcInnFl(GetRandomNumber(innfl.value, 10));
	innfl.oninput();
}
function FixOgrnUl()
{
	ogrnul.value = CalcOgrnUl(ogrnul.value);
	ogrnul.oninput();
}
function RandomOgrnUl()
{
	ogrnul.value = CalcOgrnUl(GetRandomNumber(ogrnul.value, 12, false, [1, 2, 5]));
	ogrnul.oninput();
}
function FixOgrnFl()
{
	ogrnfl.value = CalcOgrnFl(ogrnfl.value);
	ogrnfl.oninput();
}
function RandomOgrnFl()
{
	ogrnfl.value = CalcOgrnFl(GetRandomNumber(ogrnfl.value, 14, false, [3, 4]));
	ogrnfl.oninput();
}
function FixOkpo()
{
	okpo.value = CalcOkpo(okpo.value);
	okpo.oninput();
}
function RandomOkpo()
{
	okpo.value = CalcOkpo(GetRandomNumber(okpo.value, 13, true));
	okpo.oninput();
}
function FixSnils()
{
	snils.value = CalcSnils(snils.value);
	snils.oninput();
}
function RandomSnils()
{
	snils.value = CalcSnils(GetRandomNumber(snils.value, 10));
	snils.oninput();
}
function CheckInnUlButtons()
{
	CheckButtons(innul, innulButton, RandomInnUl, FixInnUl, CalcInnUl, 9);
}
function CheckInnFlButtons()
{
	CheckButtons(innfl, innflButton, RandomInnFl, FixInnFl, CalcInnFl, 10);
}
function CheckOgrnUlButtons()
{
	CheckButtons(ogrnul, ogrnulButton, RandomOgrnUl, FixOgrnUl, CalcOgrnUl, 12);
}
function CheckOgrnFlButtons()
{
	CheckButtons(ogrnfl, ogrnflButton, RandomOgrnFl, FixOgrnFl, CalcOgrnFl, 14);
}
function CheckOkpoButtons()
{
	CheckButtons(okpo, okpoButton, RandomOkpo, FixOkpo, CalcOkpo, 8);
}
function CheckSnilsButtons()
{
	CheckButtons(snils, snilsButton, RandomSnils, FixSnils, CalcSnils, 9, 11);
}
function CheckButtons(input, inputButton, randomFunc, fixFunc, calcFunc, threshold, maxlen)
{
	var pureNum = GetNumbersFromString(input.value) || "";
	maxlen = maxlen || input.maxLength;
	if (pureNum.length < threshold)
	{
		input.className = '';
		inputButton.value = 'Random';
		inputButton.onclick = randomFunc;
	}
	else
	{
		inputButton.onclick = fixFunc;
		if (pureNum.length == maxlen || input.id == 'okpo')
		{
			if (input.value == calcFunc(input.value))
			{
				input.className = 'glowGreen';
				inputButton.value = 'Random';
				inputButton.onclick = randomFunc;
			}
			else
			{
				input.className = 'glowRed';
				inputButton.value = 'Fix';
			}
		}
		else
		{
			input.className = '';
			inputButton.value = 'Fix';
		}
	}
}
