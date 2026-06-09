import { createFileRoute, Outlet } from "@tanstack/react-router";
import pavoneFavicon from "@/stores/pavone/public/assets/pavone-favicon.png";

export const Route = createFileRoute("/stores/pavone")({
  head: () => ({
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: pavoneFavicon,
      },
      {
        rel: "apple-touch-icon",
        href: pavoneFavicon,
      },
    ],
  }),
  component: PavoneLayout,
});

function PavoneLayout() {
  return <Outlet />;
}
