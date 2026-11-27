import Image from 'next/image';

export default function BrandLogo({ priority = false }: { priority?: boolean }) {
  return (
    <>
      <Image
        src="/images/logo.png"
        alt="bgit"
        width={144}
        height={48}
        priority={priority}
        className="brand-logo-dark h-12 w-36"
      />
      <Image
        src="/images/logo-light.png"
        alt=""
        aria-hidden="true"
        width={144}
        height={48}
        priority={priority}
        className="brand-logo-light h-12 w-36"
      />
    </>
  );
}
