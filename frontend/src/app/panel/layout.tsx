export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pageContent">{children}</div>;
}
