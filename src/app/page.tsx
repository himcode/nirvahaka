import Image from "next/image";
import CategorySidebar from "./components/CategorySidebar";
import Link from "next/link";
import BrowseServices from "./components/BrowseServices";






export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     
       <BrowseServices></BrowseServices>




    </main>
  );
}
