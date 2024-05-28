const warCrimePrompt = `
Given information, tell me if it's a war crime in the given JSON format starting from this prompt:

{ "country" : "Country", "severity" : "severity of the crime on a scale 1-10", "reasons" : ["reasons"]}


I'll assume that by "war crime," you mean an atrocity committed during wartime. If there is no war crime then say only "()" AND ABSOLUTELY NOTHING ELSE. DO NOT SAY "no war crime here!" Make your decision using international humanitarian and war crime law and precedents; certain stories may describe a crime, but we want only WAR CRIMES as defined by international law.

Here's an example:

{ "country" : "United States", "severity" : "9", "reasons" : ["The use of napalm, a highly flammable and toxic substance, caused severe burns and long-term health effects to civilians and soldiers alike", "It was often used to attack villages and cities, causing widespread destruction and terror"]} 
DO NOT RESPOND WITH ANYTHING OTHER THAN THIS JSON OUTPUT. YOUR RESPONSE SHOULD ONLY CONTAIN THE CONTENT FROM THE OPEN "{" TO THE CLOSED "}" IF THERE IS NO WAR CRIME AT ALL RESPOND WITH NOTHING BUT "()". NO OTHER TEXT SHOULD BE PRESENT
Do the same for this:
`
;
module.exports = warCrimePrompt;
