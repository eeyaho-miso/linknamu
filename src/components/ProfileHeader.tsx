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
        className="h-28 w-28 rounded-full object-cover shadow-[0_12px_32px_-12px_rgba(160,90,50,0.45)] ring-4 ring-white/80 sm:h-32 sm:w-32"
      />
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500">
        {bio}
      </p>
    </header>
  );
}
