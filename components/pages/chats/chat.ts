export type Message = {
    id: number;
    sender: string;
    avatar: string;
    text: string;
    time: string;
    isSent: boolean;
    status?: string;
  };
  
  export type Group = {
    id: number;
    title: string;
    icon: string;
    time: string;
    badge?: string;
    read?: boolean;
    members: number;
    messages: Message[];
  };


export const INITIAL_GROUPS: Group[] = [
  {
    id: 1,
    title: "50KM Ultra Run",
    icon: "ATHLETICS\nCLUB",
    time: "11:05 AM",
    badge: "56+",
    members: 21,
    messages: [
      { id: 1, sender: "John", avatar: "https://picsum.photos/seed/john/100/100", text: "Just finished my warm-up. Feeling strong today! Who else is attempting this weekend? 💪", time: "10:32 AM", isSent: false },
      { id: 2, sender: "J. Devis", avatar: "https://picsum.photos/seed/jdevis/100/100", text: "@G.Hernandez Me! Going for sub 5 hours. Any tips for managing pace at the 30km mark? 🏃‍♂️", time: "10:35 AM", isSent: false },
      { id: 3, sender: "You", avatar: "https://picsum.photos/seed/you/100/100", text: "Good luck everyone! First time attempting an extreme challenge 🔥", time: "11:03 AM", isSent: true, status: "Delivered" },
      { id: 4, sender: "S. Kimura", avatar: "https://picsum.photos/seed/skimura/100/100", text: "Nutrition is key 🍌 I go with gels every 45 min after the 20km mark", time: "11:05 AM", isSent: false },
    ],
  },
  {
    id: 2,
    title: "100KM Elevation Ride",
    icon: "THE BIKE\nRIDE",
    time: "9:24 AM",
    badge: "12",
    members: 45,
    messages: [
      { id: 1, sender: "S. Kimura", avatar: "https://picsum.photos/seed/skimura/100/100", text: "Nutrition is key. I just bought some new gels.", time: "9:20 AM", isSent: false },
      { id: 2, sender: "Alex", avatar: "https://picsum.photos/seed/alex/100/100", text: "Make sure to check your tire pressure before we head out.", time: "9:24 AM", isSent: false },
    ],
  },
  {
    id: 3,
    title: "5KM Swim",
    icon: "SWIMMING\nCLUB",
    time: "Yesterday",
    read: true,
    members: 8,
    messages: [
      { id: 1, sender: "Coach", avatar: "https://picsum.photos/seed/coach/100/100", text: "Great session today everyone.", time: "Yesterday", isSent: false },
      { id: 2, sender: "You", avatar: "https://picsum.photos/seed/you/100/100", text: "Just Finished my warm-down. See you next week!", time: "Yesterday", isSent: true, status: "Read" },
    ],
  },
  {
    id: 4,
    title: "Boxing Sparring",
    icon: "BOXING\nCLUB",
    time: "Yesterday",
    members: 12,
    messages: [
      { id: 1, sender: "Mike", avatar: "https://picsum.photos/seed/mike/100/100", text: "Anyone up for sparring tomorrow?", time: "Yesterday", isSent: false },
    ],
  },
  {
    id: 5,
    title: "Morning Yoga",
    icon: "YOGA\nSTUDIO",
    time: "Mon",
    read: true,
    members: 15,
    messages: [
      { id: 1, sender: "Sarah", avatar: "https://picsum.photos/seed/sarah/100/100", text: "Don't forget your mats!", time: "Mon", isSent: false },
    ],
  },
  {
    id: 6,
    title: "Weekend Hiking",
    icon: "HIKING\nTRAIL",
    time: "Sun",
    members: 32,
    messages: [
      { id: 1, sender: "David", avatar: "https://picsum.photos/seed/david/100/100", text: "The views from the peak were amazing.", time: "Sun", isSent: false },
    ],
  },
];