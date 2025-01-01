import { useRouter } from "next/router";
import { useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function SmartLinkRedirect() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchSmartLink() {
      try {
        // Reference the smartLink document
        const docRef = doc(db, "smartLinks", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { spotify, apple, google } = docSnap.data();
          const redirectUrl = spotify || apple || google;

          if (!redirectUrl) {
            alert("No valid SmartLinks available for this podcast.");
            return;
          }

          // Log click analytics
          const referrer = document.referrer || "Direct"; // Referrer info
          const userAgent = navigator.userAgent; // Browser and device info
          const trackingParams = router.query; // Query parameters in URL

          // Update the Firestore document with tracking data
          await updateDoc(docRef, {
            clicks: arrayUnion({
              timestamp: new Date().toISOString(),
              referrer,
              userAgent,
              trackingParams,
            }),
          });

          // Redirect to the appropriate URL
          window.location.href = redirectUrl;
        } else {
          alert("SmartLink not found!");
        }
      } catch (error) {
        console.error("Error fetching SmartLink:", error);
        alert("Error redirecting. Please try again later.");
      }
    }

    fetchSmartLink();
  }, [id]);

  return <div>Redirecting...</div>;
}
