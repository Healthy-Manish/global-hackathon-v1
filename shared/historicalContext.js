// Historical context data for memory enhancement

export const HISTORICAL_EVENTS = {
  1920: {
    decade: "1920s",
    context: "The Roaring Twenties - a decade of economic prosperity, jazz music, flapper culture, and significant social change.",
    music: "Jazz became mainstream with artists like Louis Armstrong and Duke Ellington",
    technology: "Radio broadcasting began, and automobiles became more common",
    events: ["Women gained the right to vote (1920)", "Prohibition began (1920-1933)", "The Great Depression started (1929)"]
  },
  
  1930: {
    decade: "1930s", 
    context: "The Great Depression era - a time of economic hardship, but also resilience and cultural development.",
    music: "Swing music and big bands became popular",
    technology: "Radio became a central part of family life",
    events: ["The Great Depression", "New Deal programs", "Golden Age of Hollywood"]
  },
  
  1940: {
    decade: "1940s",
    context: "World War II and post-war recovery - a decade defined by global conflict and subsequent rebuilding.",
    music: "Big band and swing music dominated",
    technology: "Television began to emerge, and computers were in early development",
    events: ["World War II (1939-1945)", "Atomic bombs dropped (1945)", "United Nations formed (1945)"]
  },
  
  1950: {
    decade: "1950s",
    context: "Post-war prosperity and the birth of rock and roll - a time of economic growth and cultural transformation.",
    music: "Rock and roll emerged with Elvis Presley and Chuck Berry",
    technology: "Television became common in households",
    events: ["Cold War began", "Civil Rights Movement gained momentum", "Space Race started"]
  },
  
  1960: {
    decade: "1960s",
    context: "Social revolution and cultural change - a decade of civil rights, space exploration, and musical innovation.",
    music: "The Beatles, Motown, and psychedelic rock",
    technology: "First humans landed on the moon (1969)",
    events: ["Civil Rights Act (1964)", "Vietnam War", "Martin Luther King Jr. assassination (1968)"]
  },
  
  1970: {
    decade: "1970s", 
    context: "Cultural diversity and economic challenges - disco, punk rock, and significant social changes.",
    music: "Disco, punk rock, and classic rock",
    technology: "Personal computers began to emerge",
    events: ["Vietnam War ended (1975)", "Watergate scandal", "Energy crisis"]
  },
  
  1980: {
    decade: "1980s",
    context: "Technology revolution and conservative politics - the rise of personal computing and MTV.",
    music: "New wave, hip hop, and pop music dominated",
    technology: "Personal computers became common, internet development began",
    events: ["Cold War ended", "MTV launched (1981)", "Berlin Wall fell (1989)"]
  },
  
  1990: {
    decade: "1990s",
    context: "Internet age and global connectivity - the World Wide Web changed how people communicate and access information.",
    music: "Grunge, hip hop, and boy bands",
    technology: "Internet became publicly available, mobile phones emerged",
    events: ["World Wide Web invented (1991)", "Soviet Union collapsed (1991)", "Globalization accelerated"]
  },
  
  2000: {
    decade: "2000s",
    context: "Digital revolution and social media emergence - smartphones and social networks transformed daily life.",
    music: "Digital music, streaming services began",
    technology: "Smartphones, social media, and wireless internet",
    events: ["9/11 attacks (2001)", "Facebook launched (2004)", "iPhone introduced (2007)"]
  },
  
  2020: {
    decade: "2020s",
    context: "Global pandemic and remote work revolution - significant changes in how people work and connect.",
    music: "Streaming dominance, TikTok influences",
    technology: "AI advancement, remote work tools, electric vehicles",
    events: ["COVID-19 pandemic", "Remote work became mainstream", "AI tools became widely available"]
  }
};

export const getHistoricalContext = (year) => {
  if (!year) return HISTORICAL_EVENTS[2020];
  
  const decade = Math.floor(year / 10) * 10;
  return HISTORICAL_EVENTS[decade] || HISTORICAL_EVENTS[2020];
};