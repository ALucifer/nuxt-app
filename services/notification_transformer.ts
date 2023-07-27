import { useRouter } from "vue-router";

const router = useRouter();

export function transformToLink(text: string) : string {
  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");
  const link = doc.querySelector("[data-url");
  if (!link) return text;
  const test = router.resolve({
    name: "ViewTournament",
    params: { id: link.getAttribute("data-url") },
  });
  link.removeAttribute("data-url");
  link.setAttribute("href", test.href);

  return doc.body.innerHTML;
}
