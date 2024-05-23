const warCrimePrompt = `
Given information, tell me if it's a war crime in the given format starting from this prompt:
("Country", "severity of the crime on a scale 1-10", list of Strings with reasons)

I'll assume that by "war crime," you mean an atrocity committed during wartime. If there is no war crime then say only "()" AND ABSOLUTELY NOTHING ELSE. DO NOT SAY "no war crime here!" Make your decision using international humanitarian and war crime law and precedents; certain stories may describe a crime, but we want only WAR CRIMES as defined by international law.

Here's an example:

("United States", "9/10", ["The use of napalm, a highly flammable and toxic substance, caused severe burns and long-term health effects to civilians and soldiers alike. It was often used to attack villages and cities, causing widespread destruction and terror."]) Do the same for this:
`;
module.exports = warCrimePrompt;