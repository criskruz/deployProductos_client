import { ActionFunctionArgs,  useLoaderData } from "react-router-dom";
import {
  actualizarDisponib,
  obtenerProducto,
} from "../services/ProductoService";
import ProductoDetalle from "../components/ProductoDetalle";
import { Producto } from "../types";


//Louder permite consultar datos de una API
export async function loader() {
  const productos = await obtenerProducto();
  return productos || [];
  
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await actualizarDisponib(+data.id);

  return {};
}

// en el componente
const Productos = () => {
  //recupero productos desde la función loder
  const productos = useLoaderData() as Producto[]; // estoy pasando el type de Producto

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl  text-blue-950 ">Productos</h2>

     
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <ProductoDetalle key={producto.id} producto={producto} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Productos;
