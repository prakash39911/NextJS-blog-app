import { CarouselComponent } from "@/components/Carousel";
import { getAllBlog } from "./actions/blogActions";
import HomePageCard from "@/components/HomePageCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user.id;
  const data = await getAllBlog();

  const allBlogs = data?.allBlogs;

  if (allBlogs && allBlogs.length === 0)
    return <HomePageCard isLoggedIn={isLoggedIn} />;

  return (
    <div className=" bg-gray-200 rounded-lg flex vertical-center px-24 lg:px-44 items-center justify-center">
      {allBlogs && <CarouselComponent allBlogs={allBlogs} />}
    </div>
  );
}
