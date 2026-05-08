export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  image: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "top-scorer-final-match",
    category: "Football",
    title: "Top Scorer To The Final Match",
    excerpt: "The Rankings of the Top Scorer for this season that joined this game gave to the European League Finals.",
    content: `<p>The Rankings of the Top Scorer for this season that joined this game gave to the European League Finals. It was an incredible journey that saw the best players from across the continent battle it out for supremacy.</p><p>The final match was nothing short of spectacular, with both teams giving their all on the pitch. The crowd was treated to a masterclass of football as the top scorer proved why they deserved their ranking throughout the season.</p><p>Analysts and fans alike have been discussing the performance in detail, with many calling it one of the best individual performances in recent memory. The player's ability to read the game and create opportunities was on full display.</p>`,
    author: "James Wilson",
    authorAvatar: "/images/avatar1.jpg",
    date: "April 24, 2026",
    image: "/images/hero-athlete.png",
    featured: true,
  },
  {
    id: "2",
    slug: "messi-leaving-psg",
    category: "Football",
    title: "Lionel Messi Leaving Ligue 1 Team Paris Saint-Germain, Club Confirms",
    excerpt: "The Rankings of the Top Scorer for this individual move that passed the biggest goal of the European League Finals.",
    content: `<p>In a bombshell announcement that has sent shockwaves through the football world, Paris Saint-Germain has officially confirmed that Lionel Messi will be leaving the club at the end of the current season.</p><p>The Argentine superstar joined PSG in the summer of 2021 following his emotional departure from FC Barcelona, where he had spent his entire professional career. His time in Paris was marked by both highs and lows.</p><p>Club officials released a statement expressing their gratitude for Messi's contributions to the team and wishing him well in his future endeavors. Fans gathered outside the Parc des Princes to show their appreciation for the 7-time Ballon d'Or winner.</p>`,
    author: "Sophie Martin",
    authorAvatar: "/images/avatar2.jpg",
    date: "April 23, 2026",
    image: "/images/football-cat.jpg",
    featured: true,
  },
  {
    id: "3",
    slug: "golden-ball-great-design",
    category: "Football",
    title: "Golden Ball: Great Design For the World Racing Championship",
    excerpt: "The unique soccer ball design that has dominated headlines this week has captured global attention.",
    content: `<p>The new Golden Ball design unveiled for the World Racing Championship has been met with widespread acclaim from players and fans alike. The innovative design incorporates aerodynamic improvements that promise to change the way the game is played.</p>`,
    author: "Carlos Rivera",
    authorAvatar: "/images/avatar3.jpg",
    date: "April 22, 2026",
    image: "/images/football-cat.jpg",
  },
  {
    id: "4",
    slug: "nba-player-unique-season",
    category: "Basketball",
    title: "NBA Player Has A Unique Season With The World's Top Cup",
    excerpt: "An extraordinary performance that has set new benchmarks for the sport across the globe this season.",
    content: `<p>This NBA season has been nothing short of extraordinary, with one player standing head and shoulders above the rest. Their performances have drawn comparisons with the all-time greats of the sport.</p>`,
    author: "Marcus Johnson",
    authorAvatar: "/images/avatar1.jpg",
    date: "April 21, 2026",
    image: "/images/basketball-cat.jpg",
  },
  {
    id: "5",
    slug: "super-celebrity-fighting-showcase",
    category: "Boxing",
    title: "Super Celebrity Fighting Showcase The New Champion This Season",
    excerpt: "The most-watched boxing event of the decade brought together legends and rising stars alike.",
    content: `<p>The Super Celebrity Fighting Showcase drew record audiences worldwide as the new champion was crowned in a thrilling finale that had fans on the edge of their seats throughout the entire event.</p>`,
    author: "Angela Torres",
    authorAvatar: "/images/avatar2.jpg",
    date: "April 20, 2026",
    image: "/images/boxing.jpg",
  },
  {
    id: "6",
    slug: "cycling-member-benefits",
    category: "Cycling",
    title: "Discover The Member Benefits Of USA Cycling!",
    excerpt: "Join USA Cycling today and unlock exclusive benefits, training programs and championship opportunities.",
    content: `<p>USA Cycling has announced an exciting new membership package that provides cyclists of all levels with access to world-class training resources, exclusive events, and competitive opportunities across the country.</p>`,
    author: "Brian Scott",
    authorAvatar: "/images/avatar3.jpg",
    date: "April 19, 2026",
    image: "/images/hero-athlete.png",
  },
  {
    id: "7",
    slug: "table-tennis-world-championship",
    category: "Table Tennis",
    title: "Table Tennis World Championship: Asian Stars Dominate",
    excerpt: "The World Table Tennis Championship saw incredible performances from top-ranked Asian players.",
    content: `<p>The World Table Tennis Championship was a showcase of incredible skill and athleticism, with Asian players demonstrating why they continue to dominate the sport at the highest level. Fans were treated to breathtaking rallies and precision play throughout the event.</p>`,
    author: "Li Wei",
    authorAvatar: "/images/avatar1.jpg",
    date: "April 18, 2026",
    image: "/images/tabletennis-cat.jpg",
  },
  {
    id: "8",
    slug: "formula1-car-sport-preview",
    category: "Car Sport",
    title: "Formula 1 Season Preview: Who Will Claim The Championship?",
    excerpt: "As the new Formula 1 season gets underway, teams are pulling out all the stops to secure the championship.",
    content: `<p>The new Formula 1 season promises to be one of the most competitive in recent memory. With regulation changes affecting aerodynamics and power units, teams have been working tirelessly during the off-season to gain a competitive edge.</p>`,
    author: "Max Steiner",
    authorAvatar: "/images/avatar2.jpg",
    date: "April 17, 2026",
    image: "/images/carsport-cat.jpg",
  },
];

export const clubs = [
  { rank: 1, name: "Manchester City",  flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", w: 24, d: 4, l: 2, pts: 76 },
  { rank: 2, name: "Arsenal",          flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", w: 22, d: 5, l: 3, pts: 71 },
  { rank: 3, name: "Liverpool",        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", w: 20, d: 7, l: 3, pts: 67 },
  { rank: 4, name: "Real Madrid",      flag: "🇪🇸", w: 19, d: 5, l: 6, pts: 62 },
  { rank: 5, name: "Bayern Munich",    flag: "🇩🇪", w: 18, d: 6, l: 6, pts: 60 },
  { rank: 6, name: "PSG",             flag: "🇫🇷", w: 17, d: 7, l: 6, pts: 58 },
];
