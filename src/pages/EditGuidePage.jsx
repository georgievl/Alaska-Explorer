import { useParams } from "react-router-dom";

export default function EditGuidePage() {
  const { guideId } = useParams();

  return (
    <section>
      <h1>Edit Guide</h1>
      <p>Editing guide with ID: <strong>{guideId}</strong></p>
      <p>
        This page will contain a pre-filled form to edit an existing guide.
      </p>
    </section>
  );
}
