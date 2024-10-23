import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-blue-900">
        <div className="mx-auto max-w-6xl py-5 flex justify-between">
        
          <img src="../../public/logo.jpg" alt="" className="h-28 w-auto" />
          <nav className="flex justify-around gap-4 py-5">
          <Link
          to="/"
          className="text-white hover:text-gray-400"
        >
          Listar Productos
        </Link>
        <Link
          to="producto/nuevo"
          className="text-white hover:text-gray-400"
        >
          Registrar Producto
        </Link>
          </nav>
        </div>
      </header>
      <main className="mt-10 mx-auto max-w-6xl p-10 bg-white shadow">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
