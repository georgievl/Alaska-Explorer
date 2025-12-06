import { useParams } from "react-router-dom";

export default function GuideDetailsPage() {
  const { guideId } = useParams();

  return (
    <section>
      <h1>Guide Details</h1>
      <p>Showing details for guide with ID: <strong>{guideId}</strong></p>
      <p>
        This page will show full guide content, likes, and comments. Logged-in
        users will be able to like and comment here.
      </p>
    </section>
  );
}
