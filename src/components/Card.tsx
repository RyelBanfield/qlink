const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded bg-neutral-100 p-6">{children}</div>;
};

export default Card;
