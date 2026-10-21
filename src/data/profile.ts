export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  image: string;
  links: LinkItem[];
};

// 프로필과 링크는 여기서 수정합니다.
export const profile: Profile = {
  name: "무코딩",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "/profile.png",
  links: [
    { id: "github", title: "💻 깃허브", url: "https://github.com/eeyaho-miso" },
    { id: "blog", title: "✍️ 블로그", url: "https://sarangmoo.tistory.com" },
    { id: "email", title: "📧 이메일", url: "mailto:sarangmoowoo@gmail.com" },
  ],
};
