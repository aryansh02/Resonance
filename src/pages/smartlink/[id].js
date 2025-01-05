import { useRouter } from "next/router";
import { useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function SmartLinkRedirect() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady || !id) return; // Wait until the router is ready and `id` is available

    async function fetchSmartLink() {
      try {
        console.log("Fetching SmartLink with ID:", id); // Debugging log

        const docRef = doc(db, "smartLinks", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.error(`SmartLink with ID ${id} not found.`);
          alert("SmartLink not found!");
          return;
        }

        const { spotify, apple, google } = docSnap.data();
        const redirectUrl = spotify || apple || google;

        if (!redirectUrl) {
          console.error(`No valid redirect URL found for SmartLink ID: ${id}`);
          alert("No valid SmartLinks available for this podcast.");
          return;
        }

        // Capture tracking details
        const referrer = document.referrer || "Direct";
        const userAgent = navigator.userAgent;
        const trackingParams = { ...router.query }; // Capture all query parameters

        console.log("Redirecting to URL:", redirectUrl);
        console.log("Tracking details:", {
          referrer,
          userAgent,
          trackingParams,
        });

        // Update Firestore with click tracking
        await updateDoc(docRef, {
          clicks: arrayUnion({
            timestamp: new Date().toISOString(),
            referrer,
            userAgent,
            trackingParams,
          }),
        });

        // Perform the redirect
        window.location.href = redirectUrl;
      } catch (error) {
        console.error("Error during SmartLink redirect:", error);
        alert("Error redirecting. Please try again later.");
      }
    }

    fetchSmartLink();
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1>Redirecting...</h1>
    </div>
  );
}
