package com.kimreik.helpers;

public class DebugTimer
{
	private long	lastTime;

	public DebugTimer()
	{
		lastTime = System.currentTimeMillis();
	}

	public String tick(String message)
	{
		long res = System.currentTimeMillis() - lastTime;
		lastTime = System.currentTimeMillis();
		return message + " in " + res + "ms";
	}
}
