function UnitConversions_Test(input0, input1)
{
	return (input0 + input1);
}

//Start:Temperature
function sfcConv_K_C(input)
{
	return (input - 273.15);
}

function sfcConv_K_F(input)
{
	return ((input * (9.0/5.0)) - 459.67);
}

function sfcConv_C_K(input)
{
	return (input + 273.15);
}

function sfcConv_C_F(input)
{
	return ((input * (9.0/5.0)) + 32.0);
}

function sfcConv_F_C(input)
{
	return ((input - 32.0)/(5.0/9.0));
}

function sfcConv_F_K(input)
{
	return ((input + 459.67) * (5.0/9.0));
}
//End:Temperature

//Start:Pressure
function sfcConv_Pa_mbar(input)
{
	return (input/100.0);
}

function sfcConv_Pa_inHg(input)
{
	return (input/3386.389);
}

function sfcConv_mbar_Pa(input)
{
	return (input*100.0);
}

function sfcConv_mbar_inHg(input)
{
	return (input*0.0295333727);
}

function sfcConv_inHg_Pa(input)
{
	return (input*3386.389);
}

function sfcConv_inHg_mbar(input)
{
	return (input*33.86);
}
//End:Pressure

//Start:Speed
function sfcConv_MetersPerSecond_mph(input)
{
	return (input * 2.24);
}

function sfcConv_MetersPerSecond_knots(input)
{
	return (input * 1.94);
}

function sfcConv_mph_MetersPerSecond(input)
{
	return (input * 0.45);
}

function sfcConv_mph_knots(input)
{
	return (input * 0.869);
}

function sfcConv_knots_MetersPerSecond(input)
{
	return (input * 0.51);
}

function sfcConv_knots_mph(input)
{
	return (input * 1.15);
}

//End:Speed

//Start:Distance
function sfcConv_m_ft(input)
{
	return (input * 3.2808);
}

function sfcConv_m_in(input)
{
	return (input * 39.37);
}

function sfcConv_m_mi(input)
{
	return (input * 0.000621371);
}

function sfcConv_ft_m(input)
{
	return (input * 0.3048);
}

function sfcConv_ft_in(input)
{
	return (input * 12.0);
}

function sfcConv_ft_mi(input)
{
	return (input * 0.000189394);
}

function sfcConv_in_m(input)
{
	return (input * 0.0254);
}

function sfcConv_in_ft(input)
{
	return (input / 12.0);
}

function sfcConv_in_mi(input)
{
	return (input / 0.000189394)/12.0;
}

function sfcConv_mi_m(input)
{
	return (input * 1609.34);
}

function sfcConv_mi_ft(input)
{
	return (input * 5280.0);
}

function sfcConv_mi_in(input)
{
	return (input * 63360.0);
}
//End:Distance

