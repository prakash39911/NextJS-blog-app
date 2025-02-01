import { CarouselComponent } from "@/components/Carousel";
import { getAllBlog } from "./actions/blogActions";
import HomePageCard from "@/components/HomePageCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user.id;
  const allBlogs = await getAllBlog();

  if (allBlogs && allBlogs.length === 0)
    return <HomePageCard isLoggedIn={isLoggedIn} />;

  return (
    <div className="bg-gray-800 vertical-center">
      <div className="container mx-auto bg-gray-800">
        {allBlogs && <CarouselComponent allBlogs={allBlogs} />}
      </div>
    </div>
  );
}
