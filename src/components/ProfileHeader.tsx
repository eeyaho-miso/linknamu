import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  image: string;
};

export default function ProfileHeader({ name, bio, image }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={128}
        height={128}
        priority
        className="h-28 w-28 rounded-full border-2 border-emerald-500 object-cover sm:h-32 sm:w-32"
      />
      <h1 className="mt-6 text-xl font-bold sm:text-2xl">{name}</h1>
      <p className="mt-2 text-sm text-neutral-600 sm:text-base">{bio}</p>
    </header>
  );
}
