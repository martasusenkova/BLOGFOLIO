import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPost {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  author: number;
  description: string;
  likes: number;
  dislikes: number;
}

const mockPosts: IPost[] = [
  {
    id: 1,
    image: '/img1.jpg',
    title: 'The Road to Martian Colony: Planning the First Decade',
    text: 'The Red Planet beckons. We explore the critical steps and technologies needed for sustained human presence beyond Earth by 2035.',
    date: '2025-01-10',
    lesson_num: 1,
    author: 1,
    description:
      'The ambition to colonize Mars is now closer to reality than ever. This comprehensive article breaks down the infrastructural challenges, from establishing self-sustaining oxygen and water supplies to constructing radiation-shielded habitats. The first decade will focus on robust resupply chains and scaling local resource utilization (ISRU) to minimize dependence on Earth.',
    likes: 15,
    dislikes: 2,
  },
  {
    id: 2,
    image: '/img2.jpg',
    title: 'Unraveling Gravity: From Newtonian Mechanics to Quantum Loops',
    text: 'Why do we stick to the ground? A deep dive into gravity—the weakest yet most pervasive force—and the search for a unified theory.',
    date: '2025-01-15',
    lesson_num: 2,
    author: 1,
    description:
      'Gravity remains the most mysterious force in physics. We trace its understanding from Isaac Newton’s apple to Einstein’s spacetime curvature. The modern challenge lies in reconciling General Relativity with Quantum Mechanics, leading to radical ideas like gravitons, loop quantum gravity, and the search for extra dimensions that might explain its weakness.',
    likes: 18,
    dislikes: 5,
  },
  {
    id: 3,
    image: '/img3.jpg',
    title: 'Legends of the Sky: The Pioneering Astronauts Who Changed History',
    text: 'Celebrating the historic missions and extraordinary individuals whose courage defined the early years of space exploration and shaped our world.',
    date: '2025-01-20',
    lesson_num: 3,
    author: 2,
    description:
      'Before the age of commercial space flight, a few brave men and women risked everything to breach the boundaries of Earth. From Yuri Gagarin’s single orbit to the Apollo 11 moon landing, this piece honours the engineering marvels and personal sacrifices that accelerated technology, inspired generations, and forever altered humanity’s perspective on its place in the cosmos.',
    likes: 42,
    dislikes: 1,
  },
  {
    id: 4,
    image: '/img4.jpg',
    title: 'Pluto’s Heartbeat: New Horizons Reveals a Cold, Distant World',
    text: 'The distant, icy realm of Pluto continues to surprise scientists. We analyze the latest data revealing its active geology and complex atmosphere.',
    date: '2025-01-25',
    lesson_num: 4,
    author: 2,
    description:
      'New Horizons’ 2015 flyby transformed our view of Pluto from a static ice ball to a dynamic, geologically active world. The discovery of the vast, nitrogen-ice plain Sputnik Planitia, and mountain ranges made of water ice, suggests a complex internal structure and possible subsurface ocean. We discuss what these findings mean for defining "planet" and understanding the outer solar system.',
    likes: 28,
    dislikes: 7,
  },
  {
    id: 5,
    image: '/img5.jpg',
    title: 'AI in Deep Space: The Future of Robotic Explorers',
    text: 'How artificial intelligence is becoming the indispensable copilot for autonomous planetary rovers and deep space probes.',
    date: '2025-02-01',
    lesson_num: 5,
    author: 3,
    description:
      'The vast distances in space introduce crippling communication delays, making human real-time control impossible. AI is stepping in to enable smarter, more autonomous exploration. We explore how machine learning algorithms allow rovers to select rock samples, correct navigation errors, and prioritize data transmission, maximizing scientific return on missions to Mars, Europa, and beyond.',
    likes: 12,
    dislikes: 0,
  },
  {
    id: 6,
    image: '/img6.jpg',
    title: 'String Theory Explained: A Beginner’s Guide to 11 Dimensions',
    text: 'A simplified journey into the most ambitious theory in physics, proposing that fundamental particles are tiny vibrating strings.',
    date: '2025-02-05',
    lesson_num: 6,
    author: 3,
    description:
      'String Theory attempts to unify all four fundamental forces of nature by suggesting that all particles are tiny, one-dimensional strings vibrating in 10 or 11 spacetime dimensions. This article demystifies the concepts of Calabi-Yau manifolds, compactified dimensions, and the possibility of a "Theory of Everything," explaining why it remains a central, though experimentally challenging, area of research.',
    likes: 55,
    dislikes: 10,
  },
  {
    id: 7,
    image: '/img7.jpg',
    title: 'Exoplanet Hunting: Techniques for Finding Habitable Worlds',
    text: 'From transit photometry to radial velocity, an overview of the methods astronomers use to discover and characterize planets outside our solar system.',
    date: '2025-02-10',
    lesson_num: 7,
    author: 4,
    description:
      'The discovery of thousands of exoplanets has revolutionized astronomy. This article details the primary detection techniques, focusing on TESS and Kepler data. We discuss the concept of the "Goldilocks Zone" and the biosignatures scientists hope to find in exoplanet atmospheres that could indicate the presence of alien life.',
    likes: 20,
    dislikes: 3,
  },
  {
    id: 8,
    image: '/img8.jpg',
    title: 'The Dark Side of the Universe: Mysteries of Dark Matter',
    text: 'What accounts for the missing mass in the cosmos? We examine the compelling evidence for Dark Matter and the ongoing experiments to detect it.',
    date: '2025-02-15',
    lesson_num: 8,
    author: 4,
    description:
      'Dark Matter makes up approximately 85% of the total mass of the universe, yet it emits no light, making it invisible to telescopes. Evidence comes from galactic rotation curves and gravitational lensing. We explore the leading candidates for Dark Matter particles (WIMPs, axions) and the underground laboratories attempting to capture the faint signals of their interactions.',
    likes: 10,
    dislikes: 1,
  },
  {
    id: 9,
    image: '/img9.jpg',
    title: 'Space Tourism Takes Off: The New Era of Commercial Flight',
    text: 'With sub-orbital flights becoming available, what are the costs, risks, and ethical considerations of sending paying citizens to space?',
    date: '2025-02-20',
    lesson_num: 9,
    author: 5,
    description:
      'Space tourism, once a fantasy, is now driven by companies like SpaceX, Blue Origin, and Virgin Galactic. This report assesses the rapid growth of the commercial space industry. We discuss the current training requirements, the environmental impact of frequent launches, and the potential for orbital hotels and future lunar vacations.',
    likes: 33,
    dislikes: 9,
  },
  {
    id: 10,
    image: '/img10.jpg',
    title: 'Quantum Computing and Astrophysics: A Powerful Partnership',
    text: 'How the next generation of computing power is set to unlock secrets of black holes and the early universe.',
    date: '2025-02-25',
    lesson_num: 10,
    author: 5,
    description:
      'Quantum computers utilize superposition and entanglement to solve problems intractable for classical machines. For astrophysics, this means radically improved simulations of complex quantum systems, such as the dynamics inside neutron stars, the formation of black holes, and the chemical reactions in planetary atmospheres. This technology could accelerate discoveries exponentially.',
    likes: 7,
    dislikes: 2,
  },
  {
    id: 11,
    image: '/img11.jpg',
    title: 'The Europa Clipper Mission: Search for Life on Jupiter’s Icy Moon',
    text: 'All eyes are on Europa. NASA’s ambitious mission to investigate Jupiter’s moon and its vast subsurface ocean is about to launch.',
    date: '2025-03-01',
    lesson_num: 11,
    author: 6,
    description:
      'Europa, a moon of Jupiter, holds one of the highest probabilities of hosting extraterrestrial life in our solar system, thanks to its deep, global ocean hidden beneath an icy shell. The Europa Clipper, set for launch soon, will conduct dozens of close flybys, using radar to penetrate the ice and spectrometers to analyze plumes, searching for the conditions necessary for habitability.',
    likes: 40,
    dislikes: 4,
  },
  {
    id: 12,
    image: '/img12.jpg',
    title: 'Taming the Sun: The Promise of Nuclear Fusion Energy',
    text: 'Mimicking the stars on Earth—a look at the breakthroughs bringing clean, limitless fusion power closer to reality.',
    date: '2025-03-05',
    lesson_num: 12,
    author: 6,
    description:
      'Nuclear fusion, the process that powers the Sun, involves combining light atomic nuclei to release massive amounts of energy. The challenge lies in containing plasma hotter than the sun’s core. Recent advancements in magnetic confinement (tokamaks) and inertial confinement (laser fusion) suggest that net energy gain is within reach, potentially offering a sustainable, carbon-free energy solution for the planet.',
    likes: 23,
    dislikes: 6,
  },
];

interface PostsState {
  allPosts: IPost[];
  isLoading: boolean;
}

const initialState: PostsState = {
  allPosts: mockPosts,
  isLoading: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<IPost[]>) => {
      state.allPosts = action.payload;
    },

    addLike: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const post = state.allPosts.find((p) => p.id === postId);
      if (post) {
        post.likes += 1;
      }
    },

    addDislike: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const post = state.allPosts.find((p) => p.id === postId);
      if (post) {
        post.dislikes += 1;
      }
    },
  },
});

export const { setPosts, addLike, addDislike } = postsSlice.actions;
export default postsSlice.reducer;
