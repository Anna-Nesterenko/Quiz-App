export const shuffleArray = (array: any[]) =>
  [...array].sort(() => Math.random() - 0.5);

// [...array].sort(() => Math.round(Math.random() * 10));
// [...array].sort(() => Math.random() - 0.5);
