type LogoProps = {
  className?: string;
};

export default function Logo({ className = '' }: LogoProps) {
  return (
    <img
      src="https://res.cloudinary.com/dyissekq4/image/upload/v1784989503/logo_l6jizw.webp"
      alt="Eqraa logo"
      className={className}
    />
  );
}
