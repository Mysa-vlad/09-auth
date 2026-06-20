import { Metadata } from "next";
import css from "./Home.module.css"
export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "Page not found",
  openGraph: {
      title: '404 - Page not found | NoteHub',
      description: "Page not found",
      url: `https://notehub.com/`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub 404 Error Page',
        },
      ],
    },
};
const NotFoundPage = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>Sorry, the page you are looking for does not exist.</p>

    </div>
  )
}

export default NotFoundPage