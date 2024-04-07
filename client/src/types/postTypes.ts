export interface Blogger {
  id: string;
  username: string;
  profile_picture: string;
  bio: string;
}

export interface BloggersProp {
  authors: Blogger[];
}

export interface AuthorProps {
  authorName: string;
  profile_picture: string | undefined;
  createdAt: Date;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Image {
  url: string;
}

export interface BlogCardProps {
  posts: Paginated[] | null;
}

export interface Paginated {
  id: string;
  images: Image[];
  title: string;
  tags: Tag[];
  username: string;
  profile_picture: string | undefined;
  description: string;
  createdAt: Date;
}

interface BlogDetailsItem {
  id: number;
  name: string;
  link: string;
}

export interface BlogDetailsComponentsProps {
  data: BlogDetailsItem[];
}

interface PostDetails {
  user_id: string;
  username: string;
  profile_picture: string;
  post_id: string;
  title: string;
  description: string;
  createdAt: Date;
  images: Image[];
  tags: Tag[];
  tag_Id: string;
}

export interface ImagesCardProps {
  posts: PostDetails[];
}

