type blogType = {
  user: {
    name: string;
  };
  id: string;
  title: string;
  content: string;
  image: string | null;
  image_public_id: string | null;
  video: string | null;
  video_public_id: string | null;
  createdAt: Date;
  isApproved: boolean;
};

type userType = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  permissions: string[];
};
