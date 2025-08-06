import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const ApiCall = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>(`${import.meta.env.VITE_API_URL}/posts`);
        setPosts(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch posts');
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <h2 key={post.id}>{post.title}</h2>)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default ApiCall;
