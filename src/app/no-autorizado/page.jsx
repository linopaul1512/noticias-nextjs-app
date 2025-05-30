export async function generateMetadata() {
  return {
    status: 403,
  };
}

export default function NoAutorizado() {
  return (
    <div className="container mt-5">
      <h1 className="text-danger">403 - Acceso no autorizado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
    </div>
  );
}