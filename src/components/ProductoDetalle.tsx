import {
  Link,
  Form,
  ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import { Producto } from "../types";
import { formatCurrency } from "../helpers";
import { borrarProducto } from "../services/ProductoService";

type ProductoDetalles = {
  producto: Producto;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await borrarProducto(+params.id);

    return redirect("/");
  }
}

// componente
const ProductoDetalle = ({ producto }: ProductoDetalles) => {
  const fetcher = useFetcher();
  // const navigate = useNavigate(); // nos permite navegar de una página hacia otra, en lugar de Link que solo puedo usar en el return del componente, Navigate puede ser usado antes del return

  const isAvailability = producto.availability;

  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{producto.name}</td>
        <td className="p-3 text-lg text-gray-800 text-right">
          {formatCurrency(producto.price)}
        </td>

        <td className="p-3 text-lg text-gray-800 text-center">
          <fetcher.Form method="POST">
            <button
              type="submit"
              name="id"
              value={producto.id}
              className={`${
                isAvailability ? "text-black" : "text-red-600"
              } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
            >
              {isAvailability ? "Disponible" : "No Disponible"}
            </button>
          </fetcher.Form>
        </td>

        <td className="p-3 text-lg text-gray-800 ">
          <div className="flex gap-2 text-center">
            {/* <button
              onClick={() => navigate(`producto/${producto.id}/editar`)} // toma la función a donde vamos a llevar al usuario
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
            >
              Editar
            </button> */}

            <Link
              to={`producto/${producto.id}/editar`}
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
            >
              {" "}
              Editar{" "}
            </Link>

            <Form
              className="w-full"
              method="POST"
              action={`producto/${producto.id}/eliminar`}
              onSubmit={(e) => {
                if (!confirm("¿Seguro desea Eliminar?")) {
                  e.preventDefault();
                }
              }}
            >
              <input
                type="submit"
                value="Eliminar"
                className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs"
              />
            </Form>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductoDetalle;
