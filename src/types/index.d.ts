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
  updatedAt: Date;
  isApproved: boolean;
  published: boolean;
};

type userType = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  permissions: string[];
};

type ticketType = {
  id: string;
  issue: string;
  description: string;
  createdAt: Date;
  resolved: boolean;
  user: {
    email: string;
    id: string;
  };
};

type userTicketType = {
  issue: string;
  description: string;
  id: string;
  createdAt: Date;
  resolved: boolean;
};

type userBlogType = {
  id: string;
  createdAt: Date;
  title: string;
  image: string | null;
  image_public_id: string | null;
  updatedAt: Date;
  published: boolean;
  isApproved: boolean;
};
