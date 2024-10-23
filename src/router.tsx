import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Productos, { loader as loaderProducto, action as actionActualizar } from "./views/Productos";
import RegistrarProductos, {
  action as actionRegistrar,
} from "./views/RegistrarProductos";
import EditarProducto, {
  loader as editarProducto,
  action as editarProductoAction,
} from "./views/EditarProducto";
import {action as eliminarProducto} from './components/ProductoDetalle'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Productos />,
        loader: loaderProducto,
        action: actionActualizar
      },
      {
        path: "producto/nuevo",
        element: <RegistrarProductos />,
        action: actionRegistrar,
        
      },
      {
        path: "producto/:id/editar", // ROA Patrón
        element: <EditarProducto />,
        loader: editarProducto,
        action: editarProductoAction,
      },
      {
        path: "producto/:id/eliminar",
        action: eliminarProducto
      }
    ],
  },
]);
