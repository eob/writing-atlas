const AiProjects = [
  {
    personName: "Sil Hamilton",
    personBio: "Sil Hamilton is a graduate student in computational literary studies at McGill. Sil studies literary culture at scale, investigating how stories co-written with AI differ from stories written in more traditional manners. He promotes AI use in the humanities, leading workshops on ways AI can help to uncover new knowledge. His research has been covered by NBC and The Financial Times.",
    title: "Tag Prediction",
    photo: "/images/about/sil_hamilton.png",
    handle: "tag-prediction",
    usesDescription: true,
    steamshipWorkspace: "sil",
    steamshipInstance: "sil-hard-coded-package",
    steamshipMethod: "classify",
    steamshipVersion: "1.0.0-rc.1",
    steamshipPackage: "sil-hard-coded-package",
    intro: (<div className="prose">
      <p>Will a story fit on a particular shelf?</p>
      <p>This project analyzes the book jacket of a story to guess which features it might have.</p>
    </div>),
  },
  {
    personName: "Fer Aguirre",
    personBio: "Fer Aguirre is a computational linguist who leverages natural language processing techniques to craft data-driven stories. Her interest for uncovering hidden patterns in data drives her work as a data journalist. Her research is oriented around topics related to artificial intelligence, automation and data analysis applied to investigative journalism.",
    title: "Story Recommendations",
    handle: "story-recommendations",
    photo: "/images/about/fer-aguirre.png",
    steamshipPackage: "story-recommendations",
    steamshipWorkspace: "wa-storyrec-6",
    steamshipInstance: "wa-storyrec-6",
    steamshipMethod: "suggest_story",
    steamshipVersion: "1.0.5",
    usesTitle: false,
    usesDescription: true,
    intro: (<div className="prose">
      <p>Nothing beats a hand-written recommendation in a dusty local bookshop.</p>
      <p>This project attempts to re-create that feel with an AI twist.</p>
    </div>),
  },
  {
    personName: "James Tan",
    personBio: "James is a seasoned software engineer having worked in the software industry for 15+ years. He got his start in web & mobile development while at Plympton - refactoring the DailyLit website and developing the Read Rooster. Since then he's worked on platforms and greenfield projects across  the defense, music, IT, and medical industries and his work has served hundreds of thousands of people across the world.",
    title: "Book Cover Generation",
    photo: "/images/about/james-tan.jpeg",
    handle: "book-covers",
    url: "https://nocturn.herokuapp.com/",
    steamshipPackage: "book-cover-generator",
    intro: (<div className="prose">
      <p>Book covers are amazing -- and every story should have one.</p>
      <p>The cover project leverages prompt completion through OpenAI's GPT and generative models through Open AI's DALL-E to generate a variety of assets for short stories.</p>
      <p>These assets may be used in a wide variety of applications such as for covers, story art, or digital assets. The project features the ability to allow authors to progressively explore artistic styles and experiment with subjects and composition.</p>
    </div>),
  }
]

export const uniqueUserToken = "wa-v-2";
export const workspaceMaker = (packageHandle: string) => `${packageHandle}-${uniqueUserToken}`;

export default AiProjects