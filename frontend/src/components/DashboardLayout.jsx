export default function DashboardLayout({ children }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Panel de control</h1>

      <div style={{ marginTop: "20px" }}>
        {children}
      </div>
    </div>
  );
}