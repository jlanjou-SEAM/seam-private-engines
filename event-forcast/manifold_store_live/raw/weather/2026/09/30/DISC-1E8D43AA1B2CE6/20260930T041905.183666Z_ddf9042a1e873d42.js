/**
 * NOAA-ESRL-GSD-MADIS Author: Gopakumar Padmanabhan (Gopa) Last Modified: Nov
 * 2nd, 2015
 * 
 */

//function getStdPressure(altitude)
//{
//	var doc = document;
//	// input: geopotential altitude in ft.
//	// returns standard pressure in mb
//
//	// find appropriate lapse rate
//	var z = altitude * 0.3048; // z is altitude in meters
//	var h = z; // h is geopotential height
//
//	// Debug.println("into getStdPressure with "+z);
//	var level = -1;
//	for (var i = 1; i < doc.std_h_low.length; i++)
//	{
//		if (h < std_h_low[i])
//		{
//			level = i - 1;
//			break;
//		}
//	}
//	if (level == -1)
//	{
//		// Debug.println("returning early");
//		return Sounding.MISSING;
//	}
//	var p0 = doc.p_low[level];
//	var T0 = doc.T_low[level];
//	var p, T;
//	if (doc.gam[level] == 0)
//	{
//		// isothermal atmosphere
//		T = doc.T_low[level];
//		p = p0 * Math.exp(-(h - doc.std_h_low[level]) * doc.g / (doc.r * T));
//	} else
//	{
//		var alfa = -doc.g / (doc.r * doc.gam[level]);
//		T = T0 + doc.gam[level] * (h - doc.std_h_low[level]);
//		p = p0 * Math.pow((T / T0), alfa);
//	}
//	// Debug.println("t is "+T+", p is "+p+", z is "+z+", h is "+h);
//	return p;
//}