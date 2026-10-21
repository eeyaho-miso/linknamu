import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 py-16 sm:px-8 sm:py-24">
      <div className="flex w-full max-w-sm flex-col gap-12 sm:max-w-md">
        <ProfileHeader
          name={profile.name}
          bio={profile.bio}
          image={profile.image}
        />
        <ul className="flex flex-col gap-4 sm:gap-5">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard {...link} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
