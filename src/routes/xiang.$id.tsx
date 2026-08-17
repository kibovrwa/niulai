import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/xiang/$id")({
  beforeLoad: () => {
    throw redirect({ to: "/ce" });
  },
  component: () => null,
});
