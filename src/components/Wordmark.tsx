import Image from "next/image";

export default function Wordmark({ className = "h-7" }: { className?: string }) {
  return (
    <span
      className={`relative inline-block w-auto overflow-hidden ${className}`}
      style={{ aspectRatio: "2.84 / 1" }}
    >
      <Image
        src="/wordmark.png"
        alt="KILA"
        fill
        sizes="160px"
        className="object-cover mix-blend-screen"
        priority
      />
    </span>
  );
}
