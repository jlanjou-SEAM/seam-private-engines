loadSfcConvFunctions();

function loadSfcConvFunctions()
{
	window.sfcConvFunctions = new Array();
	window.sfcConvFunctions[0] = sfcConv_K_C;
	window.sfcConvFunctions[1] = sfcConv_K_F;
	window.sfcConvFunctions[2] = sfcConv_C_K;
	window.sfcConvFunctions[3] = sfcConv_C_F;
	window.sfcConvFunctions[4] = sfcConv_F_C;
	window.sfcConvFunctions[5] = sfcConv_F_K;
	window.sfcConvFunctions[6] = sfcConv_Pa_mbar;
	window.sfcConvFunctions[7] = sfcConv_Pa_inHg;
	window.sfcConvFunctions[8] = sfcConv_mbar_Pa;
	window.sfcConvFunctions[9] = sfcConv_mbar_inHg;
	window.sfcConvFunctions[10] = sfcConv_inHg_Pa;
	window.sfcConvFunctions[11] = sfcConv_inHg_mbar;
	window.sfcConvFunctions[12] = sfcConv_MetersPerSecond_mph;
	window.sfcConvFunctions[13] = sfcConv_MetersPerSecond_knots;
	window.sfcConvFunctions[14] = sfcConv_mph_MetersPerSecond;
	window.sfcConvFunctions[15] = sfcConv_mph_knots;
	window.sfcConvFunctions[16] = sfcConv_knots_MetersPerSecond;
	window.sfcConvFunctions[17] = sfcConv_knots_mph;
	window.sfcConvFunctions[18] = sfcConv_m_ft;
	window.sfcConvFunctions[19] = sfcConv_m_in;
	window.sfcConvFunctions[20] = sfcConv_m_mi;
	window.sfcConvFunctions[21] = sfcConv_ft_m;
	window.sfcConvFunctions[22] = sfcConv_ft_in;
	window.sfcConvFunctions[23] = sfcConv_ft_mi;
	window.sfcConvFunctions[24] = sfcConv_in_m;
	window.sfcConvFunctions[25] = sfcConv_in_ft;
	window.sfcConvFunctions[26] = sfcConv_in_mi;
	window.sfcConvFunctions[27] = sfcConv_mi_m;
	window.sfcConvFunctions[28] = sfcConv_mi_ft;
	window.sfcConvFunctions[29] = sfcConv_mi_in;

	window.convFunctionNames =
	{
		"sfcConv_K_C" : 0,
		"sfcConv_K_F" : 1,
		"sfcConv_C_K" : 2,
		"sfcConv_C_F" : 3,
		"sfcConv_F_C" : 4,
		"sfcConv_F_K" : 5,
		"sfcConv_Pa_mbar" : 6,
		"sfcConv_Pa_inHg" : 7,
		"sfcConv_mbar_Pa" : 8,
		"sfcConv_mbar_inHg" : 9,
		"sfcConv_inHg_Pa" : 10,
		"sfcConv_inHg_mbar" : 11,
		"sfcConv_MetersPerSecond_mph" : 12,
		"sfcConv_MetersPerSecond_knots" : 13,
		"sfcConv_mph_MetersPerSecond" : 14,
		"sfcConv_mph_knots" : 15,
		"sfcConv_knots_MetersPerSecond" : 16,
		"sfcConv_knots_mph" : 17,
		"sfcConv_m_ft" : 18,
		"sfcConv_m_in" : 19,
		"sfcConv_m_mi" : 20,
		"sfcConv_ft_m" : 21,
		"sfcConv_ft_in" : 22,
		"sfcConv_ft_mi" : 23,
		"sfcConv_in_m" : 24,
		"sfcConv_in_ft" : 25,
		"sfcConv_in_mi" : 26,
		"sfcConv_mi_m" : 27,
		"sfcConv_mi_ft" : 28,
		"sfcConv_mi_in" : 29
	};

}

function sfcConvUnitConvert(functionIndex, input)
{
	return window.sfcConvFunctions[functionIndex](input);
}

function getSfcConvFuntionIndex(functionName)
{
	if(window.convFunctionNames[functionName] == undefined)
	{
		return -1;
	}
	return window.convFunctionNames[functionName];
}
