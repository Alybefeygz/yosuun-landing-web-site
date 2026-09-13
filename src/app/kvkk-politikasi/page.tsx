import type { Metadata } from "next";
import KvkkViewer from "./KvkkViewer";

export const metadata: Metadata = {
  title: "KVKK Politikası | Yosuun",
  description:
    "Yosuun E-Ticaret Ekosistemi Kişisel Verilerin Korunması ve İşlenmesi Politikası.",
};

export default function KvkkPolitikasiPage() {
  return <KvkkViewer />;
}
